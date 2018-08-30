/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         describe('URLs Defined', function () {
           it("All URLs are defined", function () {
             for (let i = 0; i < allFeeds.length; i++) {
               expect(allFeeds[i].url).toBeDefined();
             }
           });
         })

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         describe('Names Defined', function () {
             it("All names are defined and not empty", function () {
               for (let i = 0; i < allFeeds.length; i++) {
                 expect(allFeeds[i].name).toBeDefined();
                 expect(allFeeds[i].name).not.toBe("");
               }
             });
         })
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu Suite', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         describe("The menu ", function () {
           it("is hidden by default", function () {
             let bodyTag = document.getElementsByTagName('body')[0];
             expect(bodyTag.classList.contains("menu-hidden")).toBe(true);
           })
         })
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        describe("The menu", function () {
          it("changes visibility when clicked, and again when clicked again", function () {
            //simulate click - menu should be visible
            //let bodyTag = document.getElementsByTagName('body')[0];
            //console.log("Body tag equals: " + bodyTag);
            //bodyTag.click();
            let menu = document.querySelector('.menu-icon-link')
            menu.click();
            //console.log("Simulated one mouseclick")
            let bodyTag = document.getElementsByTagName('body')[0];
            //let bodyTag = document.getElementsByTagName('body')[0];
            //console.log("Body class list equals: " + bodyTag.classList);
            expect(bodyTag.classList.contains("menu-hidden")).toBe(false);

            //simulate another click - menu should be hidden again
            menu.click();
            //console.log("Simulated another mouseclick");
            //bodyTag = document.getElementsByTagName('body')[0];
            //console.log("Body class list equals: " + bodyTag.classList);
            expect(bodyTag.classList.contains("menu-hidden")).toBe(true);
          })
        })
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function () {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, function () {
              done();
            });
        });

         it("Entry added to feed container", function (done) {
           let firstEntry = document.getElementsByClassName('entry-link')[0];
           //console.log("Inside it statement, firstEntry is: " + firstEntry.textContent);
           expect(firstEntry.textContent).not.toBe(undefined);
           done();
         })
      });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe("New Feed Selection", function () {


        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         let origFirstEntryText, newEntries;
         /*loadFeed(0, function(done) {
          origEntries = document.getElementsByClassName('entry-link');
          //origFirstEntryText = new String(document.getElementsByClassName('entry-link')[0].textContent);
        });*/

        beforeEach(function (done) {
          loadFeed(0, function () {
            //origEntries = document.getElementsByClassName('entry-link');
            origFirstEntryText = document.getElementsByClassName('entry-link')[0].textContent;
            //origEntries = document.getElementsByClassName('entry-link');
            loadFeed(1, function () {
              newEntries = document.getElementsByClassName('entry-link');
              done();
            })
          })
        });

        it('LoadFeed function changes content', function () {
          //let origFirstEntryText = new String(document.getElementsByClassName('entry-link')[0].textContent);
          //console.log("Supposed constant is: " + origFirstEntryText);
          /*loadFeed(0, function() {
            console.log("Calling loadFeed at index 0 inside it block");
            //origFirstEntryText = new String(document.getElementsByClassName('entry-link')[0].textContent);
            console.log("Supposed constant is: " + origFirstEntryText);
            //origEntries = document.getElementsByClassName('entry-link');
            //origFirstEntryText = origEntries[0].textContent;
            //console.log("\t" + origEntries[0].textContent);
            //done();
          })
          loadFeed(1, function() {
            console.log("Calling loadFeed at index 1 inside it block");
            //newEntries = document.getElementsByClassName('entry-link');
            //console.log("\tOld Entries text content " + origEntries[0].textContent);
            console.log("\tNew Entries text content " + newEntries[0].textContent);
            console.log("\tSupposed constant is: " + origFirstEntryText);
            //done();
            //expect(origFirstEntryText).not.toBe(newEntries[0].textContent);
            //done();
          })*/
          console.log("After both loadfeeds, the original text is: " + origFirstEntryText);
          console.log("\tAnd the new text is: " + newEntries[0].textContent);
          expect(origFirstEntryText).not.toBe(newEntries[0].textContent);
            //done();
        })
    });


         /*let origEntries = document.getElementsByClassName('entry-link');

         beforeEach(function(done) {
           origEntries = document.getElementsByClassName('entry-link');
           loadFeed(1, function () {
             done();
           });
         });

         it("Load feed functions properly", function () {
           let newEntries = document.getElementsByClassName('entry-link');

         // Does one exist?
         expect(newEntries).not.toBe(undefined);

         // and must match the appropriate title
         expect( articleTitle.text() ).toEqual( allFeeds[ feedIndex ].name );

         // TODO: >>>>>> but it must not be identical to the first feed <<<<<<<<
         expect( articleTitle.text() ).not.toEqual( allFeeds[ originalFeedIndex ].name );

         // must stop async
         done();
       })*/
    //});
}());//END OF ALL TESTING
