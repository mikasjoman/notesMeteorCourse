import { FilesCollection } from 'meteor/ostrio:files';

const Images = new FilesCollection({
  collectionName: 'Images',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 15485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 12MB';
    }
  }
});

export const UserFiles = new Meteor.Collection('user_files');

// if (Meteor.isClient) {
//   Meteor.subscribe('files.images.all');
// }

if (Meteor.isServer) {
  Meteor.publish('files.all', function () {
    return Images.find().cursor;
  });
  Meteor.publish('user_files', function(){
    return UserFiles.find({ userId: this.userId });
  });
}

export default Images; // To be imported in other files
