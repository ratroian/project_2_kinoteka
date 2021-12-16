export const bodyHtml = `
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
    
    <div id="filters-modal" class="filters-modal-box hide">
        <form id="filters" name="filters" class="form-filters frosted-glass-effect" action="#">
            <div class="form-filters__header">
                <input type="text" name="movie-title" id="movie-title" placeholder="Search..." class="basic-field">
    
                <select name="movie-status" id="movie-status" class="basic-field" title="movie status">
                    <option selected value="">Movie status</option>
                    <option value="released">Released</option>
                    <option value="rumored">Rumored</option>
                    <option value="canceled">Canceled</option>
                    <option value="planned">Planned</option>
                    <option value="inProduction">In Production</option>
                    <option value="postProduction">Post Production</option>
                </select>
    
                <select name="movie-language" id="movie-language" class="basic-field" title="movie language">
                    <option selected value="">Languages</option>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="ru">Russian</option>
                    <option value="ua">Ukrainian</option>
                </select>
            </div>
            <div class="form-filters__ranges">
                <div id="budget" class="form-filters__ranges__item double-range">
                    <div class="double-range__title">Budget, $</div>
                    <div class="double-range__info">
                        <input id="budget-min" type="text" class="double-range__info-min basic-field" value="0">
                        <input id="budget-max" type="text" class="double-range__info-max basic-field" value="800 000 000">
                    </div>
                    <div class="double-range__place">
                        <input id="budget-min-range" type="range" class="double-range__place-item" min="0" max="800000000" step="100000" value="0">
                        <input id="budget-max-range" type="range" class="double-range__place-item" min="0" max="800000000" step="100000" value="800000000">
                    </div>
                </div>
                <div id="popularity" class="form-filters__ranges__item double-range">
                    <div class="double-range__title">Popularity</div>
                    <div class="double-range__info">
                        <input id="popularity-min" type="text" class="double-range__info-min basic-field" value="0">
                        <input id="popularity-max" type="text" class="double-range__info-max basic-field" value="1 000">
                    </div>
                    <div class="double-range__place">
                        <input id="popularity-min-range" type="range" class="double-range__place-item" min="0" max="1000" step="1" value="0">
                        <input id="popularity-max-range" type="range" class="double-range__place-item" min="0" max="1000" step="1" value="1000">
                    </div>
                </div>
                <div id="revenue" class="form-filters__ranges__item double-range">
                    <div class="double-range__title">Revenue</div>
                    <div class="double-range__info">
                        <input id="revenue-min" type="text" class="double-range__info-min basic-field" value="0">
                        <input id="revenue-max" type="text" class="double-range__info-max basic-field" value="200 000">
                    </div>
                    <div class="double-range__place">
                        <input id="revenue-min-range" type="range" class="double-range__place-item" min="0" max="200000" step="1" value="0">
                        <input id="revenue-max-range" type="range" class="double-range__place-item" min="0" max="200000" step="1" value="200000">
                    </div>
                </div>
            </div>
            <div class="form-filters__release-date">
                <div id="release-date-first" class="form-filters__release-date__item date-picker">
                    <input type="text" value="" placeholder="Select Date.." data-input class="basic-field date-picker__input">
    
                    <a class="input-button date-picker__clear" title="clear" data-clear>
                        <i class="icon-close">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="#DBDEE5" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8167 0.183594C14.8748 0.241644 14.921 0.310604 14.9525 0.386526C14.984 0.462448 15.0002 0.543839 15.0002 0.626038C15.0002 0.708236 14.984 0.789628 14.9525 0.865549C14.921 0.941471 14.8748 1.01043 14.8167 1.06848L1.0684 14.8167C0.951055 14.9341 0.791903 15 0.625954 15C0.460006 15 0.300854 14.9341 0.18351 14.8167C0.0661668 14.6994 0.000244141 14.5402 0.000244141 14.3743C0.000244141 14.2083 0.0661668 14.0492 0.18351 13.9318L13.9318 0.183594C13.9898 0.125397 14.0588 0.0792246 14.1347 0.0477206C14.2106 0.0162165 14.292 0 14.3742 0C14.4564 0 14.5378 0.0162165 14.6137 0.0477206C14.6896 0.0792246 14.7586 0.125397 14.8167 0.183594V0.183594Z" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.183594 0.183594C0.125397 0.241644 0.0792246 0.310604 0.0477206 0.386526C0.0162165 0.462448 0 0.543839 0 0.626038C0 0.708236 0.0162165 0.789628 0.0477206 0.865549C0.0792246 0.941471 0.125397 1.01043 0.183594 1.06848L13.9318 14.8167C14.0492 14.9341 14.2083 15 14.3743 15C14.5402 15 14.6994 14.9341 14.8167 14.8167C14.9341 14.6994 15 14.5402 15 14.3743C15 14.2083 14.9341 14.0492 14.8167 13.9318L1.06848 0.183594C1.01043 0.125397 0.941471 0.0792246 0.865549 0.0477206C0.789628 0.0162165 0.708236 0 0.626038 0C0.543839 0 0.462448 0.0162165 0.386526 0.0477206C0.310604 0.0792246 0.241644 0.125397 0.183594 0.183594V0.183594Z" />
                            </svg>
                        </i>
                    </a>
                </div>
    
                <div id="release-date-last" class="form-filters__release-date__item date-picker">
                    <input type="text" value="" placeholder="Select Date.." data-input class="basic-field date-picker__input">
    
                    <a class="input-button date-picker__clear" title="clear" data-clear>
                        <i class="icon-close">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="#DBDEE5" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8167 0.183594C14.8748 0.241644 14.921 0.310604 14.9525 0.386526C14.984 0.462448 15.0002 0.543839 15.0002 0.626038C15.0002 0.708236 14.984 0.789628 14.9525 0.865549C14.921 0.941471 14.8748 1.01043 14.8167 1.06848L1.0684 14.8167C0.951055 14.9341 0.791903 15 0.625954 15C0.460006 15 0.300854 14.9341 0.18351 14.8167C0.0661668 14.6994 0.000244141 14.5402 0.000244141 14.3743C0.000244141 14.2083 0.0661668 14.0492 0.18351 13.9318L13.9318 0.183594C13.9898 0.125397 14.0588 0.0792246 14.1347 0.0477206C14.2106 0.0162165 14.292 0 14.3742 0C14.4564 0 14.5378 0.0162165 14.6137 0.0477206C14.6896 0.0792246 14.7586 0.125397 14.8167 0.183594V0.183594Z" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.183594 0.183594C0.125397 0.241644 0.0792246 0.310604 0.0477206 0.386526C0.0162165 0.462448 0 0.543839 0 0.626038C0 0.708236 0.0162165 0.789628 0.0477206 0.865549C0.0792246 0.941471 0.125397 1.01043 0.183594 1.06848L13.9318 14.8167C14.0492 14.9341 14.2083 15 14.3743 15C14.5402 15 14.6994 14.9341 14.8167 14.8167C14.9341 14.6994 15 14.5402 15 14.3743C15 14.2083 14.9341 14.0492 14.8167 13.9318L1.06848 0.183594C1.01043 0.125397 0.941471 0.0792246 0.865549 0.0477206C0.789628 0.0162165 0.708236 0 0.626038 0C0.543839 0 0.462448 0.0162165 0.386526 0.0477206C0.310604 0.0792246 0.241644 0.125397 0.183594 0.183594V0.183594Z" />
                            </svg>
                        </i>
                    </a>
                </div>
            </div>
            <div class="form-filters__buttons">
                <button type="submit" class="basic-btn">Submit</button>
                <button type="reset" class="basic-btn" disabled>Reset</button>
            </div>
        </form>
    </div>
    
    <script type="text/template" id="filmItemTemplate">
        <div class="card" data-movieid="{{movieId}}">
            <div class="card-wrapper">
                <div class="film-poster">
                    <img src="{{backdropPath}}" class="small-poster">
                </div>
                <div class="film-description">
                    <div class="film-name">
                        <span>{{title}}</span>
                    </div>
                    <div class="film-duration">
                        <span>{{runtime}}</span>
                    </div>
                </div>
                <div class="film-rate {{typeRate}}">
                    <span>{{movieRate}}</span>
                </div>
            </div>
        </div>
    </script>
`;

export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IkFsZXhTbWl0aCIsInVzZXJJZCI6NCwiaWF0IjoxNjM4ODA2ODAzLCJleHAiOjE2Mzg4MjQ4MDN9.HzKCuTghq-GPM_yyljQCcGM1educDOFSsW9NsAM71BA';
