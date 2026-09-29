import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getPhotos = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { data, error } = await supabase.from('user_photos').select('*').eq('user_id', userId);
    if (error) throw error;
    return res.json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};

export const uploadPhoto = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { placeId, photoData, xpGain } = req.body;

    if (!photoData || !placeId) {
      return res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'Missing photoData or placeId' } });
    }

    // Extract base64 part
    const matches = photoData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    
    // For local sim/svg data URLs which are not base64 encoded:
    let buffer;
    let mimeType = 'image/png';
    let fileExtension = 'png';
    
    if (photoData.startsWith('data:image/svg+xml')) {
      // It's the simulated SVG data URL from PhotosPage.tsx
      const svgMatch = photoData.match(/^data:image\/svg\+xml;utf8,(.+)$/);
      if (svgMatch) {
         buffer = Buffer.from(decodeURIComponent(svgMatch[1]), 'utf-8');
         mimeType = 'image/svg+xml';
         fileExtension = 'svg';
      }
    } else {
      if (!matches || matches.length !== 3) {
        return res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'Invalid base64 image data' } });
      }
      buffer = Buffer.from(matches[2], 'base64');
      mimeType = matches[1];
      fileExtension = mimeType.split('/')[1] || 'png';
    }
    
    if (!buffer) {
       buffer = Buffer.from(matches ? matches[2] : '', 'base64'); // Fallback
    }

    const fileName = `${userId}/${Date.now()}-${placeId}.${fileExtension}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('quest-photos')
      .upload(fileName, buffer, {
        contentType: mimeType,
        upsert: true
      });

    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage
      .from('quest-photos')
      .getPublicUrl(fileName);

    const { data: photoRecord, error: dbError } = await supabase.from('user_photos').insert({
      user_id: userId,
      place_id: placeId,
      storage_path: uploadData.path,
      public_url: publicUrlData.publicUrl
    }).select().single();

    if (dbError) throw dbError;

    if (xpGain > 0) {
      await supabase.from('xp_transactions').insert({
        user_id: userId,
        amount: xpGain,
        reward_type: 'PHOTO_CHALLENGE',
        reference_id: placeId,
        idempotency_key: `photo-${userId}-${placeId}`
      });
      // Updating actual profile XP would be handled safely here or via DB trigger.
      // For now we will update profile explicitly:
      const { data: profile } = await supabase.from('profiles').select('xp').eq('id', userId).single();
      if (profile) {
         await supabase.from('profiles').update({ xp: profile.xp + xpGain }).eq('id', userId);
      }
    }

    return res.json({ success: true, data: photoRecord });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};

export const deletePhoto = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { photoId } = req.params;

    const { data: photo, error: photoError } = await supabase.from('user_photos').select('*').eq('id', photoId).eq('user_id', userId).single();
    if (photoError || !photo) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Photo not found or unauthorized.' } });

    // Delete from storage
    const { error: storageError } = await supabase.storage.from('quest-photos').remove([photo.storage_path]);
    if (storageError) throw storageError;

    // Delete metadata
    await supabase.from('user_photos').delete().eq('id', photoId);

    return res.json({ success: true, data: null });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: err.message } });
  }
};
