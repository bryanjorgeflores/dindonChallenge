import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 300,
    autoplay: {
      delay: 1800,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    }
  };
  active = 0;
  slides = [
    {
      img: '/assets/imgs/banner1.jpg',
      title: 'Banner 1',
      des: ['Texto descriptivo'],
      bg: 'rgba(0,0,0,.1)'
    },
    {
      img: '/assets/imgs/banner2.jpg',
      title: 'Banner 2',
      des: ['Texto descriptivo'],
      bg: 'rgba(0,0,0,.1)'

    },
    {
      img: '/assets/imgs/banner3.jpg',
      title: 'Banner 3',
      des: ['Texto descriptivo'],
      bg: 'rgba(0,0,0,.1)'
    },
    {
      img: '/assets/imgs/banner4.jpg',
      title: 'Banner 4',
      des: ['Texto descriptivo'],
      bg: 'rgba(0,0,0,.1)'
    }
  ];
  constructor(private nav: NavController) { 
    console.log('INTRO COMPONENTE');
    
  }

  ngOnInit() { }
  bg(element, index) {
    return { ['background-image']: `url(${element.img})`, ['z-index']: this.active == index ? '0' : '-1' };
  }

  bgColor(element) {
    return { ['background-color']: `${element.bg}` };
  }

  skipIntro(){
    localStorage.setItem('intro', 'true');
    this.nav.navigateRoot('home');
  }
}