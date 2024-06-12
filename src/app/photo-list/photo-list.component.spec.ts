import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PhotoListComponent } from './photo-list.component';
import { PhotoService, Photo } from '../photo.service';

class MockPhotoService {
  getPhotos() {
    const dummyPhotos: Photo[] = [
      { albumId: 1, id: 1, title: 'photo1', url: 'url1', thumbnailUrl: 'thumb1' },
      { albumId: 1, id: 2, title: 'photo2', url: 'url2', thumbnailUrl: 'thumb2' }
    ];
    return of(dummyPhotos);
  }
}

describe('PhotoListComponent', () => {
  let component: PhotoListComponent;
  let fixture: ComponentFixture<PhotoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoListComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [{ provide: PhotoService, useClass: MockPhotoService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display photos', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.photo').length).toBe(2);
    expect(compiled.querySelectorAll('.photo img').length).toBe(2);
    expect(compiled.querySelectorAll('.photo p').length).toBe(2);
    expect(compiled.querySelectorAll('.photo p')[0].textContent).toContain('photo1');
    expect(compiled.querySelectorAll('.photo p')[1].textContent).toContain('photo2');
  });
});
