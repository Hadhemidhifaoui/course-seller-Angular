import { Component } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { CanvasElement, Column, ContentText, TDocumentDefinitions } from 'pdfmake/interfaces';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as Chart from 'chart.js';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent {

  generatePDF() {
    console.log('generatePDF function called');
    const score = 80; // Replace this with the actual score
    const x = 50 + Math.sin(2 * Math.PI * score/ 100) * 40;
    const y = 50 - Math.cos(2 * Math.PI * score/ 100) * 40;

    const columns: Column[] = [
      {
        text: 'VOTRE SCORE :',
        bold: true,
        fontSize: 14,
        style: 'score',
      },
      {
        canvas: [
          { type: 'rect', x: 10, y: 10, w: 580, h: 800, r: 5, lineColor: 'black' },

        ] as CanvasElement[], // Explicitly specify the type as CanvasElement[]
        absolutePosition: { x: 0, y: 0 }, // Adjust the positioning as needed
      },


    ];
    const emailContent: ContentText = {
      text: `Cher(e) Syrine,

    Nous tenons à vous exprimer notre sincère gratitude pour avoir participé à notre test sur la plateforme Devnovate. Votre score est de ${score}/100.

    Nous avons soigneusement évalué vos réponses et nous aimerions partager quelques commentaires sur votre performance.

    1. **Points forts :**
       - Vous avez démontré une excellente compréhension des concepts clés.
       - Votre approche méthodique pour résoudre les problèmes était remarquable.

    2. **Domaines d'amélioration :**
       - Il y a des opportunités pour renforcer vos connaissances dans certains domaines spécifiques.
       - Nous vous encourageons à explorer davantage les ressources disponibles sur Devnovate pour vous aider à progresser.

    Votre engagement envers l'apprentissage est admirable, et nous sommes convaincus que vous pouvez atteindre de nouveaux sommets. N'hésitez pas à nous contacter si vous avez des questions ou si vous avez besoin d'assistance pour votre développement professionnel.

    Merci encore pour votre participation. Nous sommes impatients de vous accompagner dans votre parcours d'apprentissage sur Devnovate.

    Cordialement,

    L'équipe Devnovate\n\n`,
      style: 'emailContent',
      margin: [0, 0, 0, 10],
      color: '#333',
      fontSize: 12,
      alignment: 'justify',
    };


  if (score < 50) {
    emailContent.text += 'Malheureusement, vous n\'avez pas réussi le test. Nous vous encourageons à reprendre le test pour améliorer vos compétences. ';
    emailContent.text += 'Conseil : Concentrez-vous sur les sujets où vous avez obtenu un score inférieur et utilisez les ressources disponibles sur Devnovate pour renforcer ces compétences.';


  } else if (score >= 50 && score <= 80) {
    emailContent.text += 'Votre performance est moyenne, mais nous croyons en votre potentiel. Continuez à apprendre et à vous améliorer pour atteindre de meilleurs résultats lors de votre prochain test. ';
    emailContent.text += 'Conseil : Explorez les sujets qui vous intéressent le plus et utilisez les cours disponibles sur Devnovate pour approfondir vos connaissances.';


  } else {
    emailContent.text += 'Félicitations! Vous avez excellé dans le test. Votre engagement envers l\'apprentissage sur Devnovate est vraiment admirable. Continuez à exceller dans vos futurs projets. ';
    emailContent.text += 'Conseil : Poursuivez votre excellent travail et envisagez de participer à des projets plus avancés sur la plateforme pour mettre en pratique vos compétences.';

  }


    const documentDefinition: TDocumentDefinitions = {
      content: [

      emailContent,
      {text : ''},
      {text : ''},

        {
          alignment: 'justify',
          columns: columns,
          columnGap: 30
        },
        {text : ''},
        {text : ''},
        {
          svg: `<svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <!-- Déplacez le cercle et le chemin pour les centrer -->
          <circle cx="50" cy="50" r="40" stroke="#E7E7E7" stroke-width="10" fill="none" />
          <path d="M50 10 A 40 40 0 ${score > 50 ? "1" : "0"} 1 ${x} ${y}" stroke="#0074cc" stroke-width="10" fill="none" />
          <text x="50" y="50" text-anchor="middle" dominant-baseline="middle" font-size="18" fill="#0074cc">${score}%</text>
        </svg>


        `
        },

      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
        subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
        score: { margin: [0, 10, 0, 10] },
        para: { fontSize: 10 },
        emailContent: { fontSize: 12, margin: [0, 0, 0, 10] },
        thankYou: { fontSize: 14, bold: true, margin: [0, 0, 0, 10] },

      }
    };

    pdfMake.createPdf(documentDefinition).open();
  }
}
