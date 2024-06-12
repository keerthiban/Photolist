import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PhotoService, Photo } from './photo.service';

describe('PhotoService', () => {
  let service: PhotoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotoService]
    });
    service = TestBed.inject(PhotoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch photos', () => {
    const dummyPhotos: Photo[] = [
      { albumId: 1, id: 1, title: 'photo1', url: 'url1', thumbnailUrl: 'thumb1' },
      { albumId: 1, id: 2, title: 'photo2', url: 'url2', thumbnailUrl: 'thumb2' }
    ];

    service.getPhotos().subscribe(photos => {
      expect(photos.length).toBe(2);
      expect(photos).toEqual(dummyPhotos);
    });

    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPhotos);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
