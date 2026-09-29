import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import { AuthProvider } from "./context/AuthContext";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Welcome } from "./pages/Welcome";
import { Dashboard } from "./pages/Dashboard";
import { MapPage } from "./pages/MapPage";
import { QuestsPage } from "./pages/QuestsPage";
import { QuestDetailPage } from "./pages/QuestDetailPage";
import { MoodRoutesPage } from "./pages/MoodRoutesPage";
import { PassportPage } from "./pages/PassportPage";
import { PhotosPage } from "./pages/PhotosPage";
import { HiddenPage } from "./pages/HiddenPage";
import { QrPage } from "./pages/QrPage";
import { ReplayPage } from "./pages/ReplayPage";
import { ProfilePage } from "./pages/ProfilePage";
import { FriendsPage } from "./pages/FriendsPage";
import { FestivalsPage } from "./pages/FestivalsPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/quests" element={<QuestsPage />} />
            <Route path="/quest/:id" element={<QuestDetailPage />} />
            <Route path="/moods" element={<MoodRoutesPage />} />
            <Route path="/passport" element={<PassportPage />} />
            <Route path="/photos" element={<PhotosPage />} />
            <Route path="/hidden" element={<HiddenPage />} />
            <Route path="/qr" element={<QrPage />} />
            <Route path="/replay" element={<ReplayPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/festivals" element={<FestivalsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
    </AuthProvider>
  );
}
