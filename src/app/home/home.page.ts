import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { MensajesService } from '../services/mensajes.service';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  surveyForm: FormGroup;
  questions = {
    "apiVersion": "0.0.1",
    "data": {
      "id": "survey0",
      "questions": [
        {
          "id": 'pre1',
          "question_text": "El valor que le genera este producto es:",
          "question_options": [
            {
              "id": "res1",
              "option_text": "Muy pobre"
            },
            {
              "id": "res2",
              "option_text": "Pobre"
            },
            {
              "id": "res3",
              "option_text": "Bueno"
            }, {
              "id": "res4",
              "option_text": "Excelente"
            },
          ]
        },
        {
          "id": 'pre2',
          "question_text": "¿Seguirá comprando este producto?",
          "question_options": [
            {
              "id": "res1",
              "option_text": "Si"
            },
            {
              "id": "res2",
              "option_text": "No"
            },
          ]
        },
        {
          "id": 'pre3',
          "question_text": "¿Recomendaría este producto?",
          "question_options": [
            {
              "id": "res1",
              "option_text": "Si"
            },
            {
              "id": "res2",
              "option_text": "No"
            },
          ]
        },
      ],
      "createdAt": new Date()
    }
  };
  postForm = {
    id: '',
    answers: []
  }
  skeleton: boolean = true;

  constructor(
    private surveyService: SurveyService,
    private mensajesService: MensajesService,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.iniciar();
  }

  iniciar() {
    // FALSA CARGA 
    setTimeout(() => {
      this.skeleton = false;
    }, 1500);

    // DESCARGAR ENCUESTAS DESDE LA API
    this.getEncuesta();

    // INICIALIZAR EL FORM
    this.surveyForm = this.formBuilder.group({});

    // CREAR FALSOS CONTROLES
    this.createControls(this.questions.data.questions);

    // CREAR FALSO ID
    this.postForm.id = this.questions.data.id;
  }

  createControls(controls) {
    for (let control of controls) {
      const newFormControl = new FormControl();
      newFormControl.setValidators(Validators.required);
      this.surveyForm.addControl(control.id, newFormControl);
    }
  }

  getEncuesta() {
    this.surveyService.getEncuesta()
      .subscribe((res: any) => {
        if (res) {
          // Data de api
          this.questions = res;
          this.postForm.id = this.questions.data.id;
          this.skeleton = false;
        }
      });
  }


  postEncuesta() {
    const answers = this.surveyForm.value;
    for (let ans in answers) {
      const postAnswers = {
        id: ans,
        option: {
          id: answers[ans]
        }
      };
      this.postForm.answers.push(postAnswers);
    }
    this.surveyService.postEncuesta(this.postForm)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.mensajesService.showToast('Excelente', res.message, 'dark');
        }
      });
    // FALSO POSITIVO 
    // this.mensajesService.showToast('Excelente', 'Se subió correctamente', 'dark');
    this.showAlert('intro', 'home')
  }

  async showAlert(urlBack, urlRetry) {
    const alert = await this.alertCtrl.create({
      header: 'Genial',
      message: 'Haz respondido al cuestionario con éxito.',
      buttons: [
        {
          text: 'Salir',
          cssClass: 'alertBack',
          handler: () => {
            navigator['app'].exitApp();
          }
        }, {
          text: 'Reintentar',
          cssClass: 'alertRetry',
          handler: () => {
            // this.nav.navigateRoot(urlRetry)
            this.skeleton = true;
            this.iniciar();
          }
        }
      ]
    });

    await alert.present();
  }

}
