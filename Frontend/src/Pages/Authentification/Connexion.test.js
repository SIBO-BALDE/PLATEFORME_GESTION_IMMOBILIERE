
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Connexion from '../Authentification/Connexion';

test('submit form with empty email and password shows specific validation errors', async () => {
  render(<Connexion />);
  const submitButton = screen.getByRole('button', { name: /Se connecter/i });
  fireEvent.click(submitButton);

  // Assert specific validation errors for email and password are displayed
  expect(screen.getByText("L'email ne peut pas être vide")).toBeInTheDocument();
  expect(screen.getByText("Le mot de passe ne peut pas être vide")).toBeInTheDocument();

  // Clear the validation errors and set an invalid email and password
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalidemail' } });
  fireEvent.change(screen.getByLabelText('Mot de passe'), { target: { value: 'short' } });

  fireEvent.click(submitButton);

  // Assert specific validation errors for email and password are displayed
  expect(screen.getByText("L'email n'est pas valide")).toBeInTheDocument();
  expect(screen.getByText("Le mot de passe doit contenir au moins 8 chaines de caracteres")).toBeInTheDocument();
});


