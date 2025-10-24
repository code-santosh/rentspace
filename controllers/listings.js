const Listing = require("../models/listing.js");


module.exports.index = async (req, res) => {
    let allListing;
    const { category } = req.query;
    if (category) {
        allListing = await Listing.find({ category });
    } else {
        allListing = await Listing.find();
    }

    res.render("listings/index.ejs", { allListing });
};

module.exports.newForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let currListing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");
    if (!currListing) {
        req.flash("error", "Listing Could not found!");
        res.redirect("/listings");
        return;
    }
    res.render("listings/show.ejs", { currListing });
};

module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { filename, url };
    await newListing.save();
    req.flash("success", "Listing Created!");
    res.redirect("/listings");
};

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    const currListing = await Listing.findById(id);
    if (!currListing) {
        req.flash("error", "Listing Could not found!");
        res.redirect("/listings");
        return;
    }

    let originalImageUrl = currListing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");

    res.render("listings/edit.ejs", { currListing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { filename, url };
        await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};