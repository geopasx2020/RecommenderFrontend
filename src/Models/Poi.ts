export class Poi {
  constructor(
    public id: any,
    public title: String,
    public category: String,
    public startTime: String,
    public endTime: String,
    public indoor: String,
    public imagePath: String,
    public category_id: any,
    public latitude: any,
    public longtitude: any,
    public imageId: number = -1
  ) {}
}
