var cuisines = ["Argentine",
    "Armenian",
    "Bangladeshi",
    "Belgian",
    "Brazilian",
    "Bulgarian",
    "Cajun/Creole",
    "Caribbean",
    "Chinese",
    "Cypriot",
    "Danish",
    "Ethiopian",
    "Filipino",
    "French",
    "Georgian",
    "German",
    "Greek",
    "Indonesian",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Kurdish",
    "Laotian",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "American (New)",
    "Nicaraguan",
    "Pakistani",
    "Persian/Iranian",
    "Peruvian",
    "Polish",
    "Portuguese",
    "Romanian",
    "Russian",
    "Scandinavian",
    "Somali",
    "Spanish",
    "Sri Lankan",
    "Taiwanese",
    "Tex-Mex",
    "Thai",
    "American (Traditional)",
    "Turkish",
    "Ukrainian",
    "Vietnamese",
    "Afghan",
    "African",
    "Andalusian",
    "Arabian",
    "Asturian",
    "Australian",
    "Austrian",
    "Basque",
    "Bavarian",
    "British",
    "Burmese",
    "Cambodian",
    "Catalan",
    "Chilean",
    "Corsican",
    "Cuban",
    "Czech",
    "Czech/Slovakian",
    "Galician",
    "Guamanian",
    "Halal",
    "Hawaiian",
    "Himalayan/Nepalese",
    "Honduran",
    "Hungarian",
    "Iberian",
    "Israeli",
    "Laos",
    "Lyonnais",
    "Malaysian",
    "Modern Australian",
    "Modern European",
    "Mongolian",
    "Moroccan",
    "Canadian (New)",
    "New Mexican Cuisine",
    "New Zealand",
    "Traditional Norwegian",
    "Parma",
    "Polynesian",
    "Scottish",
    "Serbo Croatian",
    "Singaporean",
    "Slovakian",
    "Swabian",
    "Swedish",
    "Swiss Food",
    "Syrian",
    "Traditional Swedish",
    "Uzbek",
    "Yugoslav"];

var msnAPIKey = "zGmgIxAUPiSuIgFacn4OCuA0tKsaIubPjtIsnz5jIJe0XQzok8BtY22hEffCOgc2uEZUnZ3OwdynFY0Zgp_QI2SJ3bUeD1IFe9fpsMc0HLYK38rt77-bZxooj1j1XXYx";
var lcAPIKey = "WUfWoOVmAoVzU0GZeM50mAJstQPhp1eYDImVEA6S6n79IQ09MrCj-3f1q0T9pmdWbK5sh7dCDo9-ey18DdRwxzoyLTOUBXsSkG8NMMaJvDsB_Xrv7KRHjyVrapbyXXYx";

var apiKey = msnAPIKey;

/*
jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});
*/

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

        // if queryObj.offset doesn't exist, set to 0
        queryObj.offset = queryObj.offset || 0;
        // if queryObj.limit doesn't exist set to 50
        queryObj.limit = queryObj.limit || 50;
        // part of ES6, permitting merging of two objects with keys being overwritten
        // by items later in the list
        queryObj = { ...base, ...queryObj };

        function constructURL(queryObj, retries, timeout) {
            retries = retries || 3;
            timeout = timeout || 2000;
            queryObj.categories = cuisines.join(",");
            var query = Object.entries(queryObj).map(a => a[0].concat("=", a[1])).join("&");
            return {
                url: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?' + query,
                method: "GET",
                headers: {
                    authorization: "Bearer ".concat(apiKey),
                },
                timeout: timeout,
                retries: retries
            };
        }

        $.ajax(constructURL(queryObj)).then(function (data, textStatus, jqXHR) {
            console.log(data);
            self.listing.total = data.total;

            /*
             * success()
             *
             * Processes data on success.
             * 
             * @param{Object} data JSON object associated with the ajax request.
             * @param{string} textStatus
             * @param{Object} jqXHR
             * 
             * @return true if success results in completion of op, else false
             */
            var success = function (data, textStatus, jqXHR) {
                console.log("SUCCESS");
                console.log(data);
                // push the data onto the local object
                for (var i = 0; i < data.businesses.length; ++i) {
                    self.listing.businesses.push(data.businesses[i]);
                }

                // if this is the last request (ie short list)
                if ((this && ("retries" in this) && this.retries === 0) || self.listing.businesses.length === self.listing.total) {
                    // set position of the query in this object
                    self.listing.position = data.region.center;
                    // process the information (ie sort by least common to most common cuisine for the search area)
                    self.process();
                    // store the data in the localstore
                    self.store();
                    // invoke the callback
                    console.log("DONE!");
                    callback(self.listing).bind(self);
                    console.log("DONE-POST!");
                    return true;
                }
                return false;
            }

            /*
             * error()
             *
             * On error from ajax retry connection
             * 
             * @param{Object} jqXHR
             * @param{string} textStatus
             * @param{number} errorThrown
             * 
             * @return true if success results in completion of op, else false
             */
            var error = function (jqXHR, textStatus, errorThrown) {
                console.log("ERROR");
                /* this used in ajax calls so "this" is the ajax object */
                var ajaxUrl = "".concat(this.url);
                if (this.retries > 0) {
                    console.log(this.retries);
                    --this.retries;
                    setTimeout(function () {
                        $.ajax(constructURL(queryObj, this.retries)).then(
                            function (data, textStatus, jqXHR) {
                                success.call(this, data, textStatus, jqXHR);
                            },
                            function (jqXHR, textStatus, errorThrown) {
                                error.call(this, jqXHR, textStatus, errorThrown);
                            }
                        );
                    }, this.timeout);
                }
                else {
                    console.log("TIMEOUT!!!!");
                }
            }

            /* if transaction complete */
            if (success(data /*, "", Object */)) {
                return;
            }

            // if more than one request is needed, generate all the remaining ajax requests at the same time.
            for (queryObj.offset = queryObj.limit; queryObj.offset < self.listing.total; queryObj.offset += queryObj.limit) {
                $.ajax(constructURL(queryObj)).then(
                    function (data, textStatus, jqXHR) {
                        success.call(this, data, textStatus, jqXHR);
                    },
                    function (jqXHR, textStatus, errorThrown) {
                        /* error, since it's in the window this must use call to use the ajax this */
                        error.call(this, jqXHR, textStatus, errorThrown);
                    }
                );
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
        child.attr("data-lat", business.coordinates.latitude);
        child.attr("data-lon", business.coordinates.longitude);
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
        phone.attr("href", "tel:" + business.phone);
        phone.text(business.phone);
        child.append(phone);
        parent.append(child);
    }
    $("#nom-list").empty();
    $("#nom-list").append(parent);
}

restaraunts = new Restaraunts();
