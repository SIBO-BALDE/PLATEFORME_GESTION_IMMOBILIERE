import { Route, Routes } from "react-router-dom";
import "./App.css";
import Inscription from "./Pages/Authentification/Inscription";
import Accueil from "./Pages/Accueil/Accueil";
import Connexion from "./Pages/Authentification/Connexion";
import Contacts from "./Pages/Contacts/Contacts";
import DashbordAdmin from "./Pages/DashbordAdmin/DashbordAdmin";
import Maisons from "./Pages/Maisons/Maisons";
import DetailMaison from "./Pages/Maisons/DétailMaison";
import Services from "./Pages/Services/Services";
import DetailServices from "./Pages/Services/DetailServices";
import Terrains from "./Pages/Terrains/Terrains";
import DetailTerrain from "./Pages/Terrains/DetailTerrain";
import Apropos from "./Pages/Apropos/Apropos";
import DetailFavorie from "./Pages/GestionFavorie/DetailFavorie";
import DetailServicesAdmin from "./Pages/GestionServices/DetailServicesAdmin";
import DetailMaisonAdmin from "./Pages/GestionMaison/DetailMaisonAdmin";
import DashboardUser from "./Pages/DashboardUser/DashboardUser";
import DetailTerrainAdmin from "./Pages/GestionTerrain/DetailTerrainAdmin";
import { AuthProvider } from "./Pages/Authentification/AuthContext";
import MentionsLegals from "./Pages/PolitiquesConfidentialités/MentionsLegals";
import PolitiqueDeConfidentialites from "./Pages/PolitiquesConfidentialités/PolitiqueDeConfidentialites";
import ConditionUtilisation from "./Pages/PolitiquesConfidentialités/ConditionUtilisation";
import GestionNewsLetter from "./Pages/GestionNewsletter/GestionNewsLetter";
import GestionMessage from "./Pages/GestionMessage/GestionMessage";
import PageError from "./Pages/PageError/PageError";
import DetailMessageAdmin from "./Pages/GestionMessage/DetailMessageAdmin";






function App() {
  return (
    <div>
       <AuthProvider>
        <Routes>
        {/* Page utilisateur */}
        <Route path="/" element={<Accueil />}></Route>
        <Route path="inscription" element={<Inscription />}></Route>
        <Route path="connexion" element={<Connexion />}></Route>
        <Route path="contact" element={<Contacts />}></Route>
        <Route path="dashbordAdmin" element={<DashbordAdmin />}></Route>
        <Route path="dashbordUser" element={<DashboardUser />}></Route>
        <Route path="maisons" element={<Maisons />}></Route>
        <Route path="terrains" element={<Terrains />}></Route>
        <Route path="services" element={<Services />}></Route>
        {/* details */}
        <Route path="detailmaison/:id" element={<DetailMaison />}></Route>
        <Route path="detailservices/:id" element={<DetailServices />}></Route>
        <Route path="detailterrain/:id" element={<DetailTerrain />}></Route>
        <Route path="/a-propos" element={<Apropos />}></Route>
        <Route path="/mentionlegal" element={<MentionsLegals/>}></Route>
        <Route path='/confidentialite' element={<PolitiqueDeConfidentialites />}></Route>
        <Route path="/conditionutiliation" element={<ConditionUtilisation />}></Route>

        {/* Composant coté admin */}
        <Route path="detailFavorie/:id" element={<DetailFavorie/>}></Route>
        <Route path="detailservicesadmin/:id" element={<DetailServicesAdmin/>}></Route>
        <Route path="detailmaisonadmin/:id" element={<DetailMaisonAdmin/>}></Route>
        <Route path="detailterrainadmin/:id" element={<DetailTerrainAdmin/>}></Route>
        <Route path="gestionnewletter" element={<GestionNewsLetter/>}></Route>
        <Route path="gestionmessage" element={<GestionMessage/>}></Route>
        <Route path="pageerror" element={<PageError/>}></Route>
        <Route path="detailmessageadmin/:id" element={<DetailMessageAdmin/>}></Route>
        <Route path="*" element={<PageError/>}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;



