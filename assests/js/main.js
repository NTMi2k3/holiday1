const $1=document.querySelector.bind(document);
const $$=document.querySelectorAll.bind(document);

const login = $1('.btn__open-login')
const register = $1('.btn__open-regist')
const modal = $1('.modal')
const modalClose = $1('.js-modal-close')
const modalContainer = $1('.form')
const btnTourMenu= $$('.btn-tour-menu')
const listTourMenu= $1('.top__des-imgs1')

function handleLogin(){
    login.addEventListener('click',()=>{
        modal.classList.add('open');
        $1('.heading__login').classList.add('active')
        $1('.line-login').classList.add('active')
    })
    register.addEventListener('click',()=>{
        modal.classList.add('open');
        $1('.heading__register').classList.add('active')
        $1('.line-register').classList.add('active')
    })
    modalClose.addEventListener('click',()=>{
        modal.classList.remove('open');
        $1('.heading__login').classList.remove('active')
        $1('.heading__register').classList.remove('active')
        $1('.line-login').classList.remove('active')
        $1('.line-register').classList.remove('active')
    })
    modal.onclick = function(){
        modalClose.click()
    }
    modalContainer.addEventListener('click',function(even){
        even.stopPropagation()
    })

}
// slider
var index=1;
function show_slide(t) {
    showImg(index=t);
}
function showImg(t) {
    var i;
    const imgs = $$('.slider__img');
    const sliderBtn = $$('.slider__btn span');
    if(t>imgs.length) index = 1;
    if(t<1) index = imgs.length;
    for( i=0;i<imgs.length;i++) imgs[i].style.display = 'none';
    for( i=0;i<sliderBtn.length;i++) sliderBtn[i].style.backgroundColor = 'transparent';
    imgs[index-1].style.display = 'block';
    sliderBtn[index-1].style.backgroundColor = 'aqua'; 
}   
function handleImg() { 
    showImg(index);
    setInterval(()=>{
        showImg(index);
        index++;
    },2000) 
}


// renderImage
var courseApi='http://localhost:3000/tours';

function getTour(callback){
    fetch(courseApi)
        .then(function(response){
            return response.json();
        })
        .then(callback);
}

function renderTour(tours){
    var listToursBlock=$1('.top__des-img');

    var html=tours.map(function(tour){
        return `
            <div class="course-item-${tour.id} col form-reiceve">
                <div class="render__cmn">
                    <div class="creat__img">
                        <img class="card__img" src="${tour.img}" alt="">
                        <ul>
                            <li><i class="fa-solid fa-star"></i></li>
                            <li><i class="fa-solid fa-star"></i></li>
                            <li><i class="fa-solid fa-star"></i></li>
                            <li><i class="fa-regular fa-star"></i></li>
                            <li><i class="fa-regular fa-star"></i></li>
                        </ul>
                    </div>
                    <div class="top__des-create-info">
                        <h2>${tour.address}</h2>
                        <p>${tour.description}</p>
                        
                        <button class="form-submit1" onclick="deleteCourse(${tour.id})" name="form-submit">Xoá</button>
                    </div> 
                </div>
            </div>
        `;
    });
    listToursBlock.innerHTML=html.join('');

    // slick comment
    $(document).ready(function(){
        $('.top__des-img').slick({
            slidesToShow: 3,
            slidesToScroll: 3,
            Infinity: true,
            autoplay: false,
            autoplaySpeed: 2000,
            prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
            nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
            dots: true,
            responsive: [
                {
                  breakpoint: 1060,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    arrows: false
                  }
                },
                {
                  breakpoint: 740,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false,
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    Infinity: false,
                    centerMode: true,
                    centerPadding: '10px',
                    dots: false,
                  }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
              ]
        });
    });
    
}

function handleCreateForm(){
    var createBtn=document.querySelector('.form-submitt');
    
    createBtn.onclick=function(){
        var urlImg =document.querySelector('input[name="url"]').value;
        var name=document.querySelector('input[name="title"]').value;
        var description=document.querySelector('input[name="description"]').value;
        var data={
            img:urlImg,
            address:name,
            description:description
        };
        var options={
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // bo
        };
        fetch(courseApi,options)
            .then(function(response){
                return response.json();
            })
            .then(function(){
                getTour(renderTour);
            })
        urlImg=name=description="";
    }
    
}
function deleteCourse(id){
    var options={
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }   
    };
    fetch(courseApi+'/'+id,options)
        .then(function(response){
            return response.json();
        })
        .then(function(){
            var courseItem=document.querySelector('.course-item-'+id);
            if(courseItem){
                courseItem.remove();
            }  
        })
}

// P4
const XH = {
    Tours: [
        {
            id: "1",
            img:"./assests/img/Notify/a1.jpg",
            address: "Đà Lạt,Lâm Đồng",
            cost:"100,000",
            time:"10",
            type: "oldTour"
        },
        {
            id: "2",
            img:"./assests/img/Notify/a1.jpg",
            address: "Đà Lạt,Lâm Đồng",
            cost:"100,000",
            time:"10",
            type: "oldTour"
        },
        {
            id: "3",
            img:"./assests/img/Notify/a1.jpg",
            address: "Đà Lạt,Lâm Đồng",
            cost:"100,000",
            time:"10",
            type: "oldTour"
        },
        {
            id: "4",
            img:"./assests/img/Notify/a2.jpg",
            address: "Cửa Lò,Nghệ An",
            cost:"200,000",
            time:"20",
            type: "newTour"
        },
        {
            id: "5",
            img:"./assests/img/Notify/a2.jpg",
            address: "Cửa Lò,Nghệ An",
            cost:"200,000",
            time:"20",
            type: "newTour"
        },
        {
            id: "6",
            img:"./assests/img/Notify/a2.jpg",
            address: "Cửa Lò,Nghệ An",
            cost:"200,000",
            time:"20",
            type: "newTour"
        }
    ]
}
function renderTours(data){
    const htmls = XH.Tours.filter((Tour)=> data==="all"?(Tour.type==="oldTour"||Tour.type==="newTour"):Tour.type===data).map((Tour)=>{
        return  `
            <div class="col des-imgItem" data.type="${Tour.type}">
                <div class="img1-link">
                    <img src="${Tour.img}" alt="anh1">
                    <div class="desInfo-imgText">
                        <div class="address-tour">
                            <i class="fa-solid fa-location-dot"></i>
                            ${Tour.address}
                            <a href="#">More information-></a>
                        </div>
                    
                        <ul>
                            <li><i class="fa-solid fa-star"></i></li>
                            <li><i class="fa-solid fa-star"></i></li>
                            <li><i class="fa-solid fa-star"></i></li>
                            <li><i class="fa-regular fa-star"></i></li>
                            <li><i class="fa-regular fa-star"></i></li>
                        </ul>
                        <div class="desInfo-footer">
                            <div class="infoMoney">
                                From ${Tour.cost}<i class="fa-solid fa-dollar-sign"></i>
                            </div>
                            <div class="infoTime">
                                <i class="fa-regular fa-clock"></i>
                                ${Tour.time}hours
                            </div>
                        </div>
                    </div>
                </div>                        
            </div>
        `
    })
    listTourMenu.innerHTML=htmls.join('');
   
}
function handleTours() {
    
    btnTourMenu.forEach((btnMenu,index) => {
        btnMenu.addEventListener('click',function(){
            $1('.btn-tour-menu.active').classList.remove('active')
            this.classList.add('active')
            var dataType = this.getAttribute("data-type")
            renderTours(dataType)
        })     
    });
}
function handleScrollTop() {
    $1('.footer-copyright button').addEventListener("click", () => {
        window.scrollTo(
            {
                left: 0,
                top: 0,
                behavior: "smooth"
            }
        )
    })
}
function start(){
    handleLogin()
    handleImg()

    getTour(renderTour);
    handleCreateForm();

    renderTours('all');
    handleTours();

    handleScrollTop()
}
start()

