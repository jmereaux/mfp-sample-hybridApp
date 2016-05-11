
/* JavaScript content from lib/jquery/src/manipulation/createSafeFragment.js in folder common */
define( [
	"./var/nodeNames"
], function( nodeNames ) {

function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

return createSafeFragment;
} );
