import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend);


export const data = {
  labels: [ 'Projet de construction restants','Projet de construction terminés'],
  datasets: [
    {
    //   label: '# of Votes',
      data: [20, 80],
      backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgb(212, 111, 77)',
        
      ],
      borderColor: [
        'transparent',
        
        
      ],
      borderWidth: 1,
    },
  ],

};
const options = {
  aspectRatio: 1.5, // Ajuste la hauteur du graphique
  cutout: '77%',
    plugins: {
      legend: {
        position: 'bottom', // Positionne la légende en bas
      },
      labels: {
        font: {
          size: 15, // Ajustez la taille de la police ici
        },
      },
      datalabels: {
        color: 'red', // Couleur du texte
        font: {
          size: '12', // Taille de la police du texte
        },
        formatter: (value, context) => {
          return context.dataIndex + ': ' + Math.round(value*100) + '%';
          
        },
    },
      


    },
    layout: {
        padding: {
          top: 30, // Ajoute une marge supérieure de 20 pixels
        },
      },
  };
  

export default function Chart() {
  return <Doughnut data={data}  options={options} plugins={[require('chartjs-plugin-datalabels')]} />;
}






