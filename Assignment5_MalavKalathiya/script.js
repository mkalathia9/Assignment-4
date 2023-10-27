$(document).ready(function () {
    class ContentItem {
        constructor(id, name, description, category) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.category = category;
        }
    
        updateContentItem(id, name, description, category) {
            if (id === this.id) {
                if (name !== undefined) this.name = name;
                if (description !== undefined) this.description = description;
                if (category !== undefined) this.category = category;
            }
        }
    
        toString() {
            return `
                <div class="content-item-wrapper" id="content-item-${this.id}">
                    <h2>${this.name}</h2>
                    <p>${this.description}</p>
                    <div>${this.category}</div>
                </div>
            `;
        }
    }
    
    const contentItems = [
        new ContentItem(0, "Tesla Model S", "Electric luxury sedan", "Electric Cars"),
        new ContentItem(1, "Ford Mustang", "American muscle car", "Sports Cars"),
        new ContentItem(2, "Toyota Prius", "Hybrid compact car", "Hybrid Cars"),
        new ContentItem(3, "Porsche 911", "High-performance sports car", "Sports Cars"),
        new ContentItem(4, "Honda Civic", "Compact car known for reliability", "Sedans")
    ];
    
  
    const contentList = $("#content-item-list");
    
    contentItems.forEach(function(item) {
        const itemHtml = item.toString();
        contentList.append(itemHtml);
    
     
        const contentWrapper = $(`#content-item-${item.id}`);
        contentWrapper.css({
            "border": "1px solid ",
            "width": "300px",
            "padding": "10px",
            "margin": "10px auto"
        });
    });
});
