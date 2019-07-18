const admin = require('firebase-admin');
const functions = require("firebase-functions");
const cors = require("cors")({origin: true});
const UUID = require("uuid-v4");
const fs = require("fs");
const {Storage} = require("@google-cloud/storage");
const storage = new Storage({
	projectId: "cashflow-69833",
	keyFilename: "cashflow.json",
});

admin.initializeApp({
	credential: admin.credential.cert(require("./cashflow.json"))
});



exports.storeImage = functions.https.onRequest((request, response) => {
	return cors(request, response, () => {
		if(
			!request.headers.authorization ||
			!request.headers.authorization.startsWith("Bearer ")
		){
			console.log("No token request");
			response.status(403).json({error: "Unathorized"});
			return;
		}
		let idToken;
		idToken = request.headers.authorization.split("Bearer ")[1];
		admin.auth().verifyIdToken(idToken)
			.then(decodedToken => {
				const body = JSON.parse(request.body);
				fs.writeFileSync("/tmp/uploaded-image.jpg", body.image, "base64", err => {
					console.log(err);
					return response.status(500).json({ error: err });
				});
				const bucket = storage.bucket("cashflow-69833.appspot.com");
				const uuid = UUID();

				return bucket.upload(
					"/tmp/uploaded-image.jpg",
					{
						uploadType: "media",
						destination: "/cashflow/" + uuid + ".jpg",
						metadata: {
							metadata: {
								contentType: "image/jpeg",
								firebaseStorageDownloadTokens: uuid
							}
						}
					},
					(err, file) => {
            console.log('reached past bucket.upload line 48');
						console.log(err, file)
						if(!err) {
							return response.status(201).json({
								imageUrl:
									"https://firebasestorage.googleapis.com/v0/b/" +
									bucket.name +
									"/o/" +
									encodeURIComponent(file.name) +
									"?alt=media&token=" +
									uuid,
				                imagePath: "/cashflow/" + uuid + ".jpg"
							});
						}else{
							console.log('err: ',err);
							return response.status(500).json({error: err})
						}
					}
				);
			})
			.catch(err => {
        console.log("Token is invalid!", err);
        response.status(403).json({error: "Unauthorized"});
      });
	});
});



exports.deleteImage = functions.database
	.ref("/cashflow/{flowId}")
	.onDelete(snap => {
		const flowData = snap.val();
		const imagePath = flowData.imagePath;
		const bucket = storage.bucket("cashflow-69833.appspot.com/");
		return bucket.file(imagePath).delete();
	});