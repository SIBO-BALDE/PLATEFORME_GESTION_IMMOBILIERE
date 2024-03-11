import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import photo from "../../fichiers/propro.png";
import { Button, Form, Image } from "react-bootstrap";
import { emailPattern } from "../../Components/Regex/Regex.js";
import axios from "axios";
import "./Auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Inscription() {
// les etats pour stocker ou modifier les informations
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConf, setShowPasswordConf] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  // state pour la validation des erreur de formulaire
  const [emailErr, setEmailErr] = useState(false);
  const [pwdError, setPwdError] = useState(false);

  // declarer la variable pour permetre la redirection dans un autre composant
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validationStatus) {
      try {
        // if(nom==='' || prenom==='' || email==='' || password==='' || passwordConf==='' || telephone==='' || image==='') {
        //     Swal.fire({
        //     icon: "error",
        //     title: "Oops...",
        //     text: "Vueillez remplir tous les champs",
        //   });
        //   return
        // la fonction return est utilisée pour sortir
        // prématurément de la fonction handleSubmit afin d'éviter l'exécution des étapes suivantes du traitement du
        //  formulaire.

        // } else if (!emailPattern.test(email) ) {
        //   setEmailErr(true);
        //   Swal.fire({
        //     icon: "error",
        //     title: "Oops...",
        //     text: "votre email est invalide",
        //   });
        //   return
        // }else if (passwordConf !== password) {
        //     setPwdError(true);
        //     Swal.fire({
        //       icon: "error",
        //       title: "Oops...",
        //       text: "la confirmation  du mot de pass à échouer",
        //     });
        //     return
        //     }else{
        // console.log(image, 'avant formData');
        const formData = new FormData();
        formData.append("nom", nom);
        formData.append("prenom", prenom);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("telephone", telephone);
        // formData.append('image', image);
        formData.append("image", image, image.name);

        // console.log(formData, 'formData inscription')
        // creer un obect dans la base de donnée
        const response = await axios.post(
          "http://localhost:8000/api/register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log(response.data.status, 'response inscription')
        // console.log(formData, 'formData inscription')
        if (response.status === 200) {
          // Succès - L'utilisateur a été enregistré
          Swal.fire({
            icon: "success",
            title: "Succès!",
            text: "Utilisateur enregistré avec succès!",
          });

          setNom("");
          setPrenom("");
          setEmail("");
          setPassword("");
          setPasswordConf("");
          setTelephone("");
          setImage("");
          navigate("/connexion");

          setErrors({});
          setSuccesseds({});
          setValidationStatus(false);
        }
      } catch (error) {}
    }
  };
  const handleCancel = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Vous etes sur?",
      text: "De vouvoiloir annuler votre inscription!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#D46F4D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, annuler!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Annulé!",
          text: "La requete à été annulé.",
          icon: "success",
        });
      }
    });
    setEmail("");
    setPassword("");
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "passwordConf") {
      setShowPasswordConf(!showPasswordConf);
    }
  };

 

  const [errors, setErrors] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    passwordConf: "",
    telephone: "",
    image: "",
  });

  const [successeds, setSuccesseds] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    passwordConf: "",
    telephone: "",
    image: "",
  });

  const [validationStatus, setValidationStatus] = useState(false);

  // funtion pour verifier si les champs sont valides ou pas
  const validateField = (name, value) => {
    // Ajoutez vos conditions de validation pour chaque champ
    let errorMessage = "";
    let successMessage = "";

    if (name === "nom") {
      if (!value.trim()) {
        errorMessage = "Nom obligatoire";
      } else if (value.trim().length < 2) {
        errorMessage = "Minimum 2 lettres";
      } else {
        successMessage = "valide";
      }
    } else if (name === "prenom") {
      if (!value.trim()) {
        errorMessage = "Prenom obligatoire";
      } else if (value.trim().length < 2) {
        errorMessage = "Minimum 2 lettress";
      } else {
        successMessage = "valide";
      }
    } else if (name === "email") {
      if (!value.trim()) {
        errorMessage = "Email obligatoire";
      } else if (!emailPattern.test(email)) {
        errorMessage = "Email invalide";
      } else {
        successMessage = "Valide";
      }
    } else if (name === "password") {
      if (!value.trim()) {
        errorMessage = "Mot de passe obligatoire";
      } else if (value.trim().length < 7) {
        errorMessage = "Minimum 8 caractéres";
      } else {
        successMessage = "Valide";
      }
    }
    if (name === "passwordConf") {
      if (!value.trim()) {
        errorMessage = "Confirmer le mot de passe";
      } else if (value.trim() !== password) {
        errorMessage = "Confirmation invalide";
      } else {
        successMessage = "Valide";
      }
    } else if (name === "telephone") {
      if (!value.trim()) {
        errorMessage = "Numero telephone obligatoire ";
      } else if (value.trim().length < 9) {
        errorMessage = "Minimum 9 chiffres";
      } else if (!/^\d+$/.test(value.trim())) {
        errorMessage = "Chiffres uniquement permis";
      } else {
        successMessage = "Valide ";
      }
    } else if (name === "image") {
      if (!value) {
        errorMessage = "L'image doit être definie";
      } else {
        successMessage = "L'image a été definie";
      }
    }

    // Mettez à jour le state en utilisant le nom du champ actuel
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
    setSuccesseds((prevSuccess) => ({
      ...prevSuccess,
      [name]: successMessage,
    }));

    const isValid = Object.values(errors).every((error) => !error);
    setValidationStatus(isValid);
  };

  return (
    <div className="container  content-flex-signin">
      <div className="img-content-form1">
        <Image src={photo} alt="" />
      </div>
      <div className="content-left-form">
        <Form>
          <h3 className="text-center mt-3 mb-3"> INSCRIPTION</h3>
          <div className="d-flex justify-content-evenly ">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nom</Form.Label>
              <span style={{ color: "red" }}>*</span>
              <Form.Control
               placeholder="Ba"
                type="text"
                onChange={(e) => {
                  setNom(e.target.value);
                  validateField("nom", e.target.value);
                }}
              />
              {errors.nom && <p className="error-message">{errors.nom}</p>}
              {successeds.nom && (
                <p className="success-message">{successeds.nom}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Prenom</Form.Label>
              <span style={{ color: "red" }}>*</span>
              <Form.Control
               placeholder="Amy"
                type="text"
                onChange={(e) => {
                  setPrenom(e.target.value);
                  validateField("prenom", e.target.value);
                }}
              />
              {errors.prenom && (
                <p className="error-message">{errors.prenom}</p>
              )}
              {successeds.prenom && (
                <p className="success-message">{successeds.prenom}</p>
              )}
            </Form.Group>
          </div>
          <div className="d-flex justify-content-evenly ">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Email</Form.Label>
              <span style={{ color: "red" }}>*</span>
              <Form.Control
               placeholder="baamy@example.com"
                type="text"
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateField("email", e.target.value);
                }}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
              {successeds.email && (
                <p className="success-message">{successeds.email}</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Mot de passe</Form.Label>
              <span style={{ color: "red" }}>*</span>
              <div className="position-relative">
                <Form.Control
                 placeholder="*********"
                  type={showPassword ? "text" : "password"}
                  className="form-control-with-icon"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validateField("password", e.target.value);
                  }}
                />

                <span
                  onClick={() => togglePasswordVisibility("password")}
                  style={{
                    position: "absolute",
                    right: "5px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    className="input-icon"
                  />
                </span>
              </div>
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
              {successeds.password && (
                <span className="success-message">{successeds.password}</span>
              )}
            </Form.Group>
          </div>
          <div className="d-flex justify-content-evenly ">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label> Confirmation mot de passe </Form.Label>
              <span style={{ color: "red" }}>*</span>
              <div className="position-relative">
                <Form.Control
                 placeholder="*********"
                  type={showPasswordConf ? "text" : "password"}
                  className="form-control-with-icon"
                  onChange={(e) => {
                    setPasswordConf(e.target.value);
                    validateField("passwordConf", e.target.value);
                  }}
                />

                <div>
                  <span
                    onClick={() => togglePasswordVisibility("passwordConf")}
                    style={{
                      position: "absolute",
                      right: "5px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={showPasswordConf ? faEye : faEyeSlash}
                      className="input-icon"
                    />
                  </span>
                </div>
                
              </div>
              {errors.passwordConf && (
                  <span className="error-message">{errors.passwordConf}</span>
                )}
                {successeds.passwordConf && (
                  <span className="success-message">{successeds.passwordConf}</span>
                )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
              <Form.Label> Télephone </Form.Label>
              <span style={{ color: "red" }}>*</span>
              <Form.Control
               placeholder="775874411"
                type="tel"
                onChange={(e) => {
                  setTelephone(e.target.value);
                  validateField("telephone", e.target.value);
                }}
              />
              {errors.telephone && (
                <p className="error-message">{errors.telephone}</p>
              )}
              {successeds.telephone && (
                <p className="success-message">{successeds.telephone}</p>
              )}
            </Form.Group>
          </div>

          <Form.Group className="mb-3  " controlId="exampleForm.ControlInput7">
            <Form.Label> Profile </Form.Label>
            <span style={{ color: "red" }}>*</span>
            <Form.Control
              type="file"
              onChange={(e) => {
                const selectedImage = e.target.files[0];
                console.log(selectedImage, "selected image");
                setImage(selectedImage);
                validateField("image", e.target.value);
              }}
              className="d-flex  justify-content-around"
            />
            {errors.image && <p className="error-message">{errors.image}</p>}
            {successeds.image && (
              <p className="success-message">{successeds.image}</p>
            )}
          </Form.Group>
          <div className="btn-content-position">
            <Button onClick={handleSubmit} type="submit" className="btn-colour">
              S'inscrire
            </Button>
            <Button
              type=""
              onClick={handleCancel}
              className="btn-colour1"
              id="btn-colour1"
              style={{ marginLeft: "10px" }}
            >
              Annuler
            </Button>
            {/* onClick={handleCancel} */}
          </div>
          <Link
            to={"/connexion"}
            className="content-link text-center "
            style={{ color: "#D46F4D", textAlign: "center" }}
          >
            Vous avez dejas un compte ? connectez vous
          </Link>
        </Form>
      </div>
    </div>
  );
}
