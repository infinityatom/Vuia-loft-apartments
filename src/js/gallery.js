function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}

export const ImageCategory = {
	Interior: 'Interior',
	Exterior: 'Exterior',
	Proiect: 'Proiect',
}

export const LoopGallery = {
	loopAll: 1,
	loopCategory: 2,
	none: 0,
}

export class GalleryImage {
	constructor(url, category) {
		this.url = url;
		this.category = category;
	}
}

class Category {
	constructor(name, images) {
		this.name = name;
		this.images = images;
		this.imgIndex = 1;
	}

	get length() {
		return this.images.length;
	}

	get currentImage() {
		return this.images[this.imgIndex - 1];
	}

	get getNextImg() {
		return this.length > this.imgIndex ? this.images[this.imgIndex] : this.images[0];
	}
}

export class Gallery {
	constructor(images, loop = LoopGallery.loopAll, resetOnLoop = true) {
		this.images = images;
		this.loop = loop;
		this.categories = this.getCategories;
		this.resetOnLoop = resetOnLoop;
		this.currentCategoryIndex = 1;
	}

	get index() {
		var index = 0;
		for (let i = 0; i < this.currentCategoryIndex - 1; i++) {
			index += this.categories[i].length;
		}
		index += this.categories[this.currentCategoryIndex - 1].imgIndex;
		return index - 1;
	}

	// returns a list of categories based on the images given
	get getCategories() {
		var categoryMap = groupBy(this.images, img => img.category);

		const arr = [];
		categoryMap.forEach((images, name) => {
			arr.push(new Category(name, images));
		});
		return arr;
	}

	get urls() {
		return this.images.map(img => img.url);
	}

	get currentCategory() {
		return this.categories[this.currentCategoryIndex - 1];
	}

	get currentImage() {
		return this.currentCategory.currentImage;
	}

	get getNextImg() {
		if (
			this.currentCategory.imgIndex < this.currentCategory.length ||
			this.loopCategory == LoopGallery.loopCategory
		) {
			return this.currentCategory.getNextImg;
		}

		if (this.loop != LoopGallery.none) {
			var cci = this.currentCategoryIndex;

			if (cci >= this.categories.length) {
				if (this.loop == LoopGallery.loopAll) {
					cci = 0;
				} else {
					throw new RangeError('End of Gallery reached');
				}
			}
			if (this.resetOnLoop == true) {
				return this.categories[cci].images[0];
			}
			return this.categories[cci].currentImage;
		}

		throw new RangeError('End of Gallery Category reached');
	}

	get currentImageIndex() {
		return this.currentCategory.imgIndex;
	}

	goToCategory(name) {
		var index = this.categories.findIndex(category => category.name == name);
		
		if (index == -1) {
			throw new ReferenceError('There is no category named: ' + name);
		}

		this.currentCategoryIndex = index + 1;
		if (this.resetOnLoop == true) {
			this.currentCategory.imgIndex = 1;
		}
		return this.currentImage;
	}

	nextImg() {
		if (this.currentCategory.imgIndex < this.currentCategory.length) {
			this.currentCategory.imgIndex += 1;
			return this.currentImage;
		}
		if (this.loopCategory == LoopGallery.loopCategory) {
			this.currentCategory.imgIndex = 1;
			return this.currentImage;
		}
		if (this.loop != LoopGallery.none) {
			if (this.currentCategoryIndex < this.categories.length) {
				this.currentCategoryIndex += 1;
			} else {
				if (this.loop == LoopGallery.loopAll) {
					this.currentCategoryIndex = 1;
				} else {
					throw new RangeError('End of Gallery reached');
				}
			}
			if (this.resetOnLoop == true) {
				this.currentCategory.imgIndex = 1;
			}
			return this.currentImage;
		}

		throw new RangeError('End of Gallery Category reached');
	}

	prevImg() {
		if (this.currentCategory.imgIndex > 1) {
			this.currentCategory.imgIndex -= 1;
			return this.currentImage;
		}
		if (this.loopCategory == LoopGallery.loopCategory) {
			this.currentCategory.imgIndex = this.currentCategory.length;
			return this.currentImage;
		}
		if (this.loop != LoopGallery.none) {
			if (this.currentCategoryIndex > 1) {
				this.currentCategoryIndex -= 1;
			} else {
				if (this.loop == LoopGallery.loopAll) {
					this.currentCategoryIndex = this.categories.length;
				} else {
					throw new RangeError('Beginning of Gallery reached');
				}
			}
			if (this.resetOnLoop == true) {
				this.currentCategory.imgIndex = this.currentCategory.length;
			}
			return this.currentImage;
		}

		throw new RangeError('Beginning of Gallery Category reached');
	}	
}