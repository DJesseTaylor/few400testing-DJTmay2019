import { add, getFavoriteForeignFilm, returnsAnObservable } from './misc';
import { doesNotThrow } from 'assert';
import { first } from 'rxjs/operators';

describe('a synchronous call', () => {
  it('can add two numbers together', () => {
    const answer = add(2, 5);
    expect(answer).toBe(7);
  });
});

describe('promises', () => {
  it('can be tricky', (done) => {
    const result = getFavoriteForeignFilm();

    result.then(a => {
      expect(a).toBe('Some balliwood film or something');
      done();
    });
  });

  // use this its better
  it('using await', async () => {
    const result = await getFavoriteForeignFilm();
    expect(result).toBe('Some balliwood film or something');
  });
});

describe('using promises', () => {
  it('using the done thing again', (done) => {
    returnsAnObservable().subscribe(r => {
      expect(r).toBe('Eggs');
      done();
    });
  });

  it('using async await', async () => {
    const meal = await returnsAnObservable().pipe(
      first()
    ).toPromise();
    expect(meal).toBe('Eggs');
  });
});
