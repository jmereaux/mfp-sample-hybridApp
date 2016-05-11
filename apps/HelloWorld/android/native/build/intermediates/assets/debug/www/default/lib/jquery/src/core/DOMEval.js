
/* JavaScript content from lib/jquery/src/core/DOMEval.js in folder common */
define( [
	"../var/document"
], function( document ) {
	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}

	return DOMEval;
} );
