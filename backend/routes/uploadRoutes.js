import path    from 'path';
import express from 'express';
import multer  from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination: ( req, file, cb ) => {
        cb( null, 'uploads/' ); // null is for error
    },
    filename( req, file, cb ) {
        cb(null, `${ file.fieldname }-${ Date.now() }${path.extname( file.originalname ) }`);
    }
})

function checkFileType( file, cb ) {
    const filetypes = /jpg|jpeg|png|webp/;

    const extname = filetypes.test( path.extname( file.originalname ).toLowerCase() );
    const mimetype = filetypes.test( file.mimetype );

    if ( !extname || !mimetype ) {
        cb( 'Please provide a valid image type.');
    }

    return cb( null, true );
}

const upload = multer({
    storage,
    fileFilter: ( req, file, cb ) => checkFileType( file, cb ),
});

const uploadImage = upload.single('image');

router.post('/', ( req, res) => {
    uploadImage( req, res, ( err ) => {
        if ( err ) {
            return res.status( 400 ).send({ message: err.message });
        }

        if ( !req.file ) {
            return res.status( 400 ).send({ message: err.message } );
        }

        res.send({
            message: 'Image uploaded',
            image: `/${ req.file.path.replace(/\\/g, '/') }`
        });
    });
});

export default router;