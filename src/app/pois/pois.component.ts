import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Poi } from 'src/Models/Poi';
import { User } from 'src/Models/User';
import { Review } from 'src/Models/Review';
import { PoiCategory } from '../common/poi-category';
import { UserService } from '../service/user.service';
import {
  faArrowAltCircleLeft,
  faFilm,
  faHome,
  faUser,
  faLocationArrow,
  faStar,
  faHistory
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pois',
  templateUrl: './pois.component.html',
  styleUrls: ['./pois.component.css'],
})
export class PoisComponent implements OnInit {
  pois: any[];
  currentPoiId: any;
  pois2: any[];
  totalPois: any[];
  categoryId: any;
  pois3: Poi[] = [];
  category: any;
  id:any;
  lastname:String='';
  firstname:String='';
  categories: PoiCategory[] = [];
  categories2 = [
    {
      id: 1,
      category: 'History',
      checked: false
    },
    {
      id: 2,
      category: 'Music',
      checked: false,
    },
    {
      id: 3,
      category: 'Sports',
      checked: false,
    },
    {
      id: 4,
      category: 'Museums',
      checked: false,
    },
    {
      id: 5,
      category: 'Art',
      checked: false,
    },
    {
      id: 6,
      category: 'Bars',
      checked: false,
    },
    {
      id: 7,
      category: 'Nature',
      checked: false,
    },
    {
      id: 8,
      category: 'Gastronomy',
      checked: false,
    },
    {
      id: 9,
      category: 'Religion',
      checked: false,
    },
    {
      id: 10,
      category: 'Shopping',
      checked: false,
    },
    {
      id: 11,
      category: 'Theater',
      checked: false,
    },
    {
      id: 12,
      category: 'Gastronomy',
      checked: false,
    },
  ];
  review: any;
  userId_00: any;
  postData: any;
  filmIcon = faFilm;
  userIcon = faUser;
  arrowOut = faArrowAltCircleLeft;
  locationIcon = faLocationArrow;
  iconStar = faStar;
  home = faHome;
  h = sessionStorage.getItem('loggedUser');
  //  starRating = 0;

  constructor(
    private router: Router,
    private userService: UserService,
    private httpClient: HttpClient,
    private route: ActivatedRoute
  ) {
    //useful for accessing route parameters
    this.pois = [];
    this.pois2 = [];
    this.pois3 = [];
    this.categories = [];
    this.review = [];
    this.totalPois=[];
  }

  ngOnInit(): void {
    this.id=localStorage.getItem('userid')
    this.route.paramMap.subscribe(() => {
      this.userId_00 = this.userService.getUserId();
      const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
      if (hasCategoryId) {
        this.currentPoiId = this.route.snapshot.paramMap.get('id');
      } else {
        this.currentPoiId = 1;
      }

      this.userService.getPoisList(this.currentPoiId).subscribe((data) => {
     
        console.log(this.pois);
        this.pois = data;
        console.log(this.pois);
        this.totalPois=data
      });
    });
    this.userService.getProfileDetailsByUser(this.id).subscribe(data=>{
      this.firstname=data.firstname
      this.lastname=data.lastname
     
       
       
     } )
  }
  Search() {
    if (this.category != '') {
    } else if (this.category == '') {
      this.ngOnInit();
    }
    this.pois = this.pois.filter((res) => {
      console.log('res', res);
      return res.category.description
        .toLocaleLowerCase()
        .match(this.category.toLocaleLowerCase());
    });
  }
  changeCheckbox(event, category) {
    this.pois=this.totalPois
    console.log(this.categories2)
    if (event.target.checked==true){
      for(var i = 0; i < this.categories2.length; i++){
        if (category!=this.categories2[i].category){
          this.categories2[i].checked=false
        }
      }
    }
    console.log(event.target.checked);
    console.log(category);
    
    console.log(this.categories2);
    let currentCategories: any = [];
    let currentPois: any = [];
    for (var i = 0; i < this.categories2.length; i++) {
      if (this.categories2[i].checked == true) {
        currentCategories.push(this.categories2[i].category);
      }
    }
    for (var i = 0; i < this.pois.length; i++) {
      
      if (currentCategories.includes(this.pois[i].category.description)) {
       currentPois.push(this.pois[i])
      }
    
    }
    if (currentCategories.length!=0){
      this.pois=currentPois
    }
    else{
      this.pois=this.totalPois
    }
    
  }

  onSubmit() {
    this.httpClient
      .get<PoiCategory[]>(`http://localhost:8080/category/allcategories`)
      .subscribe((data) => {
        this.categories = data;
      });
  }
  onChangeRating(addingscore: any, poiId: number, userId: any) {
    /*this.postData={
      score:addingscore,
      userId:userId*/
    if (!addingscore || isNaN(addingscore)) {
      return;
    }
    console.log('adding score', addingscore, 'poiid', poiId, 'userid', userId);

    console.log('userId', this.userService.getUserId());

    this.httpClient
      .post(`http://localhost:8080/pois/${poiId}/review`, {
        score: addingscore,
        userId: userId,
      })
      .subscribe((responseData) => {
        console.log('responseData:', responseData);
      });
  }
  logout() {
    this.h = null;

    localStorage.clear();

    sessionStorage.removeItem('loggedUser');

    this.router.navigate(['login']);
  }
}
