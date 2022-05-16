import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { Poi } from 'src/Models/Poi';
import { PoiCategory } from '../common/poi-category';
import { faFilm,faUser,faArrowAltCircleLeft,faHome,faPen,faPlusCircle, faPlus,faCalendar,faEnvelope,faPersonBooth,faLocationArrow } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-poi',
  templateUrl: './add-poi.component.html',
  styleUrls: ['./add-poi.component.css'],
})
export class AddPoiComponent implements OnInit {
  id: any;
  user: any;
  message: any;
  error: any;
  pois: any[];
  currentPoiId: any;
  pois2: any[];
  categoryId: any;
  pois3: Poi[] = [];
  category: any;
  categories: PoiCategory[] = [];
  totalPois: any[];
  poiId: any;
  categories2: any[];
  userIcon=faUser;
  dateIcon=faCalendar;
  arrowOut=faArrowAltCircleLeft;
  home=faHome;
  plus=faPlus;
  emailIcon=faEnvelope;
  genderIcon=faPersonBooth;
  locationIcon=faLocationArrow;
  firstname:String='';
  lastname:String='';
  email:any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.pois = [];
    this.pois2 = [];
    this.pois3 = [];
    this.categories = [];
    this.totalPois = [];
    this.categories2 = [];
  }
  Poi: Poi = new Poi('', '', '', '', '', '', '', '', '', '');
  h = sessionStorage.getItem('loggedUser');
  ngOnInit(): void {
    this.userService.getPoisList(this.currentPoiId).subscribe((data) => {
      console.log(this.pois);
      this.pois = data;
      this.totalPois = data;
      console.log('data category:', this.pois[0].category.title);
      console.log(this.pois[0].category.id);
      this.poiId = this.pois[0].id;
      this.categoryId = this.pois[0].category.id;
      console.log('this poiID:', this.poiId);
      console.log('this categoryID gggggggggg:', this.categoryId);
    });
    this.userService.getPoisCategories().subscribe((data2) => {
      this.categories2 = data2;
      console.log('poisCategories:', this.categories2);
    });
    this.route.paramMap.subscribe(()=>{
      const hasCategoryId:boolean=this.route.snapshot.paramMap.has('id')
      if (hasCategoryId){
        this.currentPoiId= this.route.snapshot.paramMap.get('id');
      }
      else{
        this.currentPoiId=1;
      }

      this.userService.getPoisList(this.currentPoiId).subscribe(data=>{
        console.log(this.pois);
        this.pois=data;
        this.totalPois=data;
        console.log(this.pois);
      })
    })
    if (
      this.h==null){
          this.router.navigate(['login']);
    
        }
        sessionStorage.setItem('authenticaterUser',this.email);
        this.id=localStorage.getItem('userid')
        this.userService.getProfileDetailsByUser(this.id).subscribe(data=>{
        this.firstname=data.firstname
        this.lastname=data.lastname
        this.email=data.email        
           
      
        })
  }
  onSubmit() {
    console.log('onsubmitpoi');
    //this.Poi.category_id = 3;
    this.userService.createPoi(this.Poi).subscribe((response) => {
      this.goToPoisList();
    });
  }
  logout() {
    this.h = '';
    localStorage.clear();
    sessionStorage.setItem('loggedUser', this.h);
    this.router.navigate(['login']);
  }
  goToPoisList() {
    this.router.navigate(['/adminviewpois']);
  }
  // selectChangeHandler (event: any) {
  //   this.categoryId = event.target.value;
  //   console.log("category id:",this.categoryId)

  // }
  onImageSelected(event) {
    const file: File = event.target.files[0];
    console.log('onImageSelected()', file);

    if (file) {
      //this.fileName = file.name;

      const formData = new FormData();

      formData.append('thumbnail', file);

      const upload$ = this.userService.uploadImage(file);
      console.log('onImageSelected()', upload$);

      upload$.subscribe((resp) => {
        this.Poi.imageId =   Number.parseInt(resp.toString());

      });
    }
  }
}
