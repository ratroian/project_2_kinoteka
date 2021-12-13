jest.mock('../src/scripts/movies/requests');

const assignMock = jest.fn();
delete window.location;
window.location = { assign: assignMock };
window.addEventListener = jest.fn((event, cb) => cb());

describe('On movies.html', () => {
    beforeAll(() => {
        localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IkFsZXhTbWl0aCIsInVzZXJJZCI6NCwiaWF0IjoxNjM4ODA2ODAzLCJleHAiOjE2Mzg4MjQ4MDN9.HzKCuTghq-GPM_yyljQCcGM1educDOFSsW9NsAM71BA');
        document.body.innerHTML = `
            <header class="header">
                <div class="container">
                    <div class="header__container">
                        <div class="header__logo">
                            <a href="./movies.html" class="header__logo-link">
                                <img class="header__logo-image" src="./images/logo/Kinoteka-logo.svg" alt="Logo">
                            </a>
                        </div>
                        <div class="header__links">
                            <a id="log-out" href="./index.html" class="basic-link header__links-item">Log Out</a>
                        </div>
                    </div>
                </div>
            </header>
            
            <main class="main">
                <div class="container movie-wrapper">
                    <div class="place-right">
                        <button class="basic-btn" id="filter-btn">Filters</button>
                    </div>
                    <div id="movie-list" class="movies"></div>
                    <div class="center">
                        <button id="load-more" class="basic-btn" disabled>Load More</button>
                    </div>
                </div>
            </main>
            
            <script type="text/template" id="filmItemTemplate">
                <div class="card" data-movie-id="{{movie_id}}">
                    <div class="card-wrapper">
                        <div class="film-poster">
                            <img src="{{backdrop_path}}" class="small-poster">
                        </div>
                        <div class="film-description">
                            <div class="film-name">
                                <span>{{title}}</span>
                            </div>
                            <div class="film-duration">
                                <span>{{runtime}}</span>
                            </div>
                        </div>
                        <div class="film-rate {{type_rate}}">
                            <span>{{movie_rate}}</span>
                        </div>
                    </div>
                </div>
            </script>
        `;

        require('../src/scripts/movies/movies');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render two movies card in start page', () => {
        const moviesCard = document.querySelectorAll('.movies .card');
        expect(moviesCard).toHaveLength(8);
    });

    it('should get two more movies and render them', () => {
        const moviesCard = document.querySelectorAll('.movies .card');
        const amountMovies = moviesCard.length;
        document.querySelector('#load-more').click();
        expect(document.querySelectorAll('.movies .card')).toHaveLength(amountMovies + 8);
    });

    it('should localStorage have a array with 5 pages with 8 movies after one request movie', () => {
        localStorage.clear();
        document.querySelector('#load-more').click();
        const movies = JSON.parse(localStorage.getItem('moviesPages'));
        expect(movies).toHaveLength(5);
        movies.forEach((item) => expect(item).toHaveLength(8));
    });

    it('should localStorage have a array with 10 pages with 8 movies after two request movie', () => {
        localStorage.clear();
        for (let i = 0; i < 6; i++) {
            document.querySelector('#load-more').click();
        }
        const movies = JSON.parse(localStorage.getItem('moviesPages'));
        expect(movies).toHaveLength(10);
        movies.forEach((item) => expect(item).toHaveLength(8));
    });

    it('should render 8 movies each time when button "load more" is pressed', () => {
        localStorage.clear();
        document.querySelector('#movie-list').innerHTML = '';
        const movies = document.querySelectorAll('.movies .card');
        expect(movies).toHaveLength(0);
        const randomNumber = Math.floor(Math.random() * 100 - 20) + 20;
        const loadMoreBtn = document.querySelector('#load-more');
        let counter = movies.length;
        for (let i = 0; i < randomNumber; i++) {
            loadMoreBtn.click();
            expect(document.querySelectorAll('.movies .card')).toHaveLength(counter += 8);
        }
    });

    it('should clear localStorage after click to logOut btn', () => {
        document.querySelector('#log-out').click();
        expect(localStorage).toHaveLength(0);
    });
});
