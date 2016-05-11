
/* JavaScript content from lib/jquery/src/css/var/isHidden.js in folder common */
define( [
	"../../core",
	"../../selector"

	// css is assumed
], function( jQuery ) {

	return function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};
} );
