
/* JavaScript content from lib/jquery/src/css/var/rnumnonpx.js in folder common */
define( [
	"../../var/pnum"
], function( pnum ) {
	return new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );
} );
