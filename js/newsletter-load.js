let newsletterScriptsLoaded = false;
const newsletterForm = document.getElementById('mc-embedded-subscribe-form');
const newsletterSubmitButton = document.getElementById('signup-button');

newsletterForm.addEventListener('submit', function(event) {
    // Prevent the form from submitting immediately
    console.log('Form submission attempted.');
    if (newsletterScriptsLoaded) {
        // If scripts are already loaded, just submit the form
        console.log('Scripts already loaded, submitting form directly.');
        return;
    }

    event.preventDefault();
    
    // Load scripts only on the first submit attempt
    var mcValidateScript = document.createElement('script');
    mcValidateScript.type = 'text/javascript';
    mcValidateScript.src = 'https://s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js';
    mcValidateScript.async = true;

    var inlineScript = document.createElement('script');
    inlineScript.type = 'text/javascript';
    inlineScript.textContent = `
        (function($) {
        window.fnames = new Array();
        window.ftypes = new Array();
        fnames[0] = 'EMAIL';
        ftypes[0] = 'email';
        // ... rest of your inline script content
        }(jQuery));
        var $mcj = jQuery.noConflict(true);
        // Wait for the document and jQuery to be ready, then attach the submit handler
        $mcj(document).ready(function() {
            $mcj('#mc-embedded-subscribe-form').bind('submit', function() {
                // This is where Mailchimp's original submit logic goes
                // For demonstration, we'll just log it. The original script would handle the AJAX submission.
                console.log('Mailchimp script is now handling the form submission.');
                return true; // Let the form proceed with the original Mailchimp logic
            });
        });
    `;

    console.log('Loading Mailchimp validation script and inline script.');
    // A promise to wait for the external script
    var mcValidateLoaded = new Promise(resolve => {
        console.log('Waiting for Mailchimp validation script to load.');
        mcValidateScript.onload = resolve;
    });

    document.head.appendChild(mcValidateScript);

    console.log('Mailchimp validation script appended to document head.');
    mcValidateLoaded.then(() => {
        console.log('Mailchimp validation script loaded, appending inline script.');
        document.head.appendChild(inlineScript);
        newsletterScriptsLoaded = true;
        // Trigger the form submission again now that the scripts are ready
        console.log('Scripts loaded, submitting form again.');
        newsletterSubmitButton.click();
    });
});