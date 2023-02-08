import { Photo } from '../models/Photo.js';
import fs from "fs";

const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({}).sort({ dateCreated: -1 });
  res.render('index', {
    photos,
  });
};

const getPhoto = async (req, res) => {
  // console.log(req.params.id);
  // res.render('about');
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
};

const addPhoto = async (req, res) => {
  // console.log(req.files)
  let uploadedImage = req.files.image;
  let uploadPath = './public/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create(
      {
        ...req.body,
        image: '/uploads/' + uploadedImage.name,
      },
      (err, photo) => {
        if (err) {
          console.log(err);
        }
      }
    );
    res.redirect('/');
  });
};

const updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photo/${req.params.id}`);
};

const deletePhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  let deleteImageUrl = './public' + photo.image;
  fs.unlinkSync(deleteImageUrl);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
};

export { getAllPhotos, getPhoto, addPhoto, updatePhoto, deletePhoto };
