var cuisines = [
    "Ainu",
    "Albanian",
    "American (New)", // not on wikipedia
    "American (Traditional)", // not on wikipedia
    "Argentine",
    "Andhra",
    "Anglo-Indian",
    "Arab",
    "Armenian",
    "Assyrian",
    "Awadhi",
    "Azerbaijani",
    "Balochi",
    "Belarusian",
    "Belgian", // missing from wikipedia
    "Bangladeshi",
    "Bengali",
    "Berber",
    "Brazilian",
    "Buddhist",
    "Bulgarian",
    "Cajun/Creole", // changed to Cajun/Creole
    "Cantonese",
    "Caribbean",
    "Chechen",
    "Chinese",
    "Chinese Islamic",
    "Circassian",
    "Crimean Tatar",
    "Cypriot",
    "Danish",
    "English",
    "Estonian",
    "Ethiopian",
    "French",
    "Filipino",
    "Georgian",
    "German",
    "Goan",
    "Goan Catholic",
    "Greek",
    "Gujarati",
    "Hyderabad",
    "Hong Kong Western",
    "Indian",
    "Indian Chinese",
    "Indian Singaporean",
    "Indonesian",
    "Inuit",
    "Irish",
    "Italian American",
    "Italian",
    "Jamaican",
    "Japanese",
    "Jewish",
    "Karnataka",
    "Kazakh",
    "Keralite",
    "Korean",
    "Kurdish",
    "Laotian",
    "Lebanese",
    "Latin American", // present in database
    "Latvian",
    "Lithuanian",
    "Louisiana Creole",
    "Maharashtrian",
    "Mangalorean",
    "Malay",
    "Malaysian Chinese",
    "Malaysian Indian",
    "Mediterranean",
    "Mexican",
    "Mordovian",
    "Mughal",
    "Native American",
    "Nepalese",
    "New Mexican",
    "Nicaraguan",
    "Odia",
    "Parsi",
    "Pashtun",
    "Polish",
    "Pennsylvania Dutch",
    "Pakistani",
    "Peranakan",
    "Persian/Iranian", // added iranian per database
    "Peruvian",
    "Portuguese",
    "Punjabi",
    "Rajasthani",
    "Romanian",
    "Russian",
    "Sami",
    "Salvadoran", // not on wikipedia
    "Scandinavian",
    "Serbian",
    "Sicilian", // not on wikipedia
    "Sindhi",
    "Slovak",
    "Slovenian",
    "Somali",
    "South Indian",
    "Soviet",
    "Spanish",
    "Sri Lankan",
    "Taiwanese",
    "Tatar",
    "Thai",
    "Turkish",
    "Tamil",
    "Tex-Mex", // In database
    "Udupi",
    "Ukrainian",
    "Vietnamese",
    "Yamal",
    "Zambian",
    "Zanzibari"];

var msnAPIKey = "zGmgIxAUPiSuIgFacn4OCuA0tKsaIubPjtIsnz5jIJe0XQzok8BtY22hEffCOgc2uEZUnZ3OwdynFY0Zgp_QI2SJ3bUeD1IFe9fpsMc0HLYK38rt77-bZxooj1j1XXYx";
var lcAPIKey = "WUfWoOVmAoVzU0GZeM50mAJstQPhp1eYDImVEA6S6n79IQ09MrCj-3f1q0T9pmdWbK5sh7dCDo9-ey18DdRwxzoyLTOUBXsSkG8NMMaJvDsB_Xrv7KRHjyVrapbyXXYx";

var apiKey = msnAPIKey;

jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

/**
 * @param{Object} obj {
 *  location
 *  latitude
 *  longitude
 *  categories
 * }
 */

class Restaraunts {
    constructor(queryObj, callback, force) {
        this.listing = {
            businesses: [],
            total: 0
        };

        this.localStoreID = "nearbyRestaraunts";
    }

    load() {
        var temp = localStorage.getItem(this.localStoreID);
        if (temp) {
            this.listing = JSON.parse(temp);
            return true;
        }
        return false;
    }

    store() {
        localStorage.setItem(this.localStoreID, JSON.stringify(this.listing));
        return true;
    }

    clear() {
        this.listing = {
            businesses: [],
            total: 0
        };
        localStorage.setItem(this.localStoreID, undefined);
    }

    retrieve(queryObj, callback, force) {
        var self = this;
        var base = { term: "restaraunts", location: "160 Spear Street, San Francisco, CA", range: 1000 };

        callback = callback || function () { };
        force = force || false;

        /* if no force flag and there is content in the localStorage */
        if (!force && this.load()) {
            callback(this.listing.businesses);
            return;
        }

        /* reset the contents of the object before re-acquiring business data */
        this.listing = {
            businesses: [],
            total: 0
        };

        queryObj.offset = queryObj.offset || 0;
        queryObj.limit = queryObj.limit || 50;
        queryObj = { ...base, ...queryObj };

        //queryObj.categories = cuisines.join(",");

        var query = Object.entries(queryObj).map(a => a[0].concat("=", a[1])).join("&");
        var ajaxUrl = 'https://api.yelp.com/v3/businesses/search?' + query;
        $.ajax({
            url: 'https://api.yelp.com/v3/businesses/search?' + query,
            method: "GET",
            headers: {
                authorization: "Bearer ".concat(apiKey),
            }
        }).then(function (data, textStatus, jqXHR) {
            self.listing.total = data.total;

            for (var i = 0; i < data.businesses.length; ++i) {
                self.listing.businesses.push(data.businesses[i]);
            }

            if (self.listing.businesses.length === self.listing.total) {
                self.listing.position = data.region.center;
                self.process();
                self.store();
                callback(self.listing).bind(self);
            }

            var error = function (jqXHR, textStatus, errorThrown) {
                /* this used in ajax calls so "this" is the ajax object */
                var ajaxUrl = "".concat(this.url);
                if (this.retries > 0) {
                    --this.retries;
                    setTimeout(function () {
                        $.ajax({
                            url: ajaxUrl,
                            method: "GET",
                            headers: {
                                authorization: "Bearer ".concat(apiKey),
                            },
                            timeout: this.timeout,
                            retries: this.retries
                        }).then(function (data, textStatus, jqXHR) {
                            for (var i = 0; i < data.businesses.length; ++i) {
                                self.listing.businesses.push(data.businesses[i]);
                            }

                            if (this.retries === 0 || self.listing.businesses.length === self.listing.total) {
                                self.listing.position = data.region.center;
                                self.process();
                                self.store();
                                callback(self.listing).bind(self);
                            }
                        },
                            function (jqXHR, textStatus, errorThrown) {
                                error.call(this, jqXHR, textStatus, errorThrown);
                            });
                    }, this.timeout);
                }
            }

            for (queryObj.offset = queryObj.limit; queryObj.offset < self.listing.total; queryObj.offset += queryObj.limit) {
                var query = Object.entries(queryObj).map(a => a[0].concat("=", a[1])).join("&");
                var ajaxUrl = 'https://api.yelp.com/v3/businesses/search?' + query;
                $.ajax({
                    url: 'https://api.yelp.com/v3/businesses/search?' + query,
                    method: "GET",
                    headers: {
                        authorization: "Bearer ".concat(apiKey),
                    },
                    timeout: 2000,
                    retries: 3
                }).then(function (data, textStatus, jqXHR) {
                    for (var i = 0; i < data.businesses.length; ++i) {
                        self.listing.businesses.push(data.businesses[i]);
                    }
                    if (this.retries === 0 || self.listing.businesses.length === self.listing.total) {
                        self.listing.position = data.region.center;
                        self.process();
                        self.store();
                        callback(self.listing).bind(self);
                    }
                },
                    function (jqXHR, textStatus, errorThrown) {
                        /* error, since it's in the window this must use call to use the ajax this */
                        error.call(this, jqXHR, textStatus, errorThrown);
                    });
            }
        });
    }

    process() {
        var processed_cuisines = {};
        for (var i = 0; i < cuisines.length; ++i) {
            processed_cuisines[cuisines[i]] = [];
        }

        for (var i = 0; i < this.listing.businesses.length; ++i) {
            var business = this.listing.businesses[i];
            var j = 0;
            for (; j < business.categories.length; ++j) {
                var category = business.categories[j];
                if (category.title in processed_cuisines) {
                    processed_cuisines[category.title].push(business);
                    break;
                }
            }
            /* code to check the content of the categories for discarded content 
            if (j === business.categories.length) {
                console.log("INDEX: " + i);
                for (var j = 0; j < business.categories.length; ++j) {
                    console.log(business.categories[j]);
                }
            } */
        }

        processed_cuisines = Object.entries(processed_cuisines).sort((a, b) => a[1].length - b[1].length);
        while (processed_cuisines[0][1].length === 0) {
            processed_cuisines.shift();
        }
        var temp = [];
        for (var entry of processed_cuisines) {
            temp = temp.concat(entry[1]);
        }
        this.listing.businesses = temp;
        this.listing.total = this.listing.businesses.length;
    }
}

function updateNomNomsCallback(listing) {
    var parent = $("<div>");
    parent.addClass("businesses");
    for (business of listing.businesses) {
        var child = $("<div>");
        child.addClass("business");
        child.attr("data-lat",business.coordinates.latitude);
        child.attr("data-lon",business.coordinates.longitude);
        var a = $("<a>");
        a.addClass("name");
        a.attr("href", business.url);
        a.text(business.name);
        child.append(a);
        var display_address = $("<p>");
        display_address.html(
            business.location.display_address[0].concat(
                "&nbsp",
                business.location.display_address[1])
            );
        child.append(display_address);
        var phone = $("<a>");
        phone.attr("href","tel:"+business.phone);
        phone.text(business.phone);
        child.append(phone);
        parent.append(child);
    }
    $("#nom-list").empty();
    $("#nom-list").append(parent);
}

restaraunts = new Restaraunts();
