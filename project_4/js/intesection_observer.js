const buttons=document.querySelectorAll(".navigation a");

const remove_highlighting=()=>{
    buttons.forEach(button=>{
        button.classList.remove("active");
    })
    
};

const add_highlighting=(sec,observer)=>{
    sec.forEach(entry=>{
        if(entry.isIntersecting){
            console.log(entry.target.id);
            let current_button=document.querySelector(`.navigation a[href='#${entry.target.id}']`);
            //console.log(current_button);
            if(current_button){
                remove_highlighting();
                current_button.classList.add("active");
                console.log(current_button);
            }
        }    
    });
};
const options={
    threshold:0.8,
};
const observer= new IntersectionObserver(add_highlighting, options);
const sections=document.querySelectorAll("div");
sections.forEach(section=>{
    observer.observe(section);
})