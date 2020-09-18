//
//  URLImage.swift
//  Happ
//
//  Created by Maksymilian Galas on 18/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI
import Combine

struct URLImage: View {
    private let url: URL?
    @State private var image: UIImage?
    private let placeholder: UIImage
    private let imageRetriever: ImageRetrievable

    init(url: URL?, placeholder: UIImage? = nil, imageRetriever: ImageRetrievable) {
        self.url = url
        self.placeholder = placeholder ?? UIImage()
        self.imageRetriever = imageRetriever
    }

    var body: some View {
        Image(uiImage: image ?? placeholder)
            .resizable()
            .onAppear(perform: downloadImage)
    }

    func downloadImage() {
        imageRetriever.downloadImage(from: url) { (image) in
            self.image = image
        }
    }
}

struct URLImage_Previews: PreviewProvider {
    static var previews: some View {
        URLImage(url: URL(string: "")!, placeholder: UIImage(named: "Logo"), imageRetriever: ImageRetrieverMock())
    }
}
