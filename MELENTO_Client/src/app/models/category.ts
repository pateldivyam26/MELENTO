export class Category{
    id:number
    categoryName:string
    categoryDescription:string
    constructor(id:number,categoryName:string,categoryDescription:string){
        this.id = id;
        this.categoryName = categoryName
        this.categoryDescription = categoryDescription;
    }
}