//
//  ImageRetriever.swift
//  Happ
//
//  Created by Maksymilian Galas on 18/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import UIKit

final class ImageRetriever: ImageRetrievable {

    private var cachedImages: [URL: CachedImage] = [:]

    func downloadImage(from url: URL?, callback: @escaping (UIImage?) -> Void) {
        guard let url = url else { return }

        if let imageContainer = cachedImages[url] {
            switch imageContainer.status {
            case .downloading:
                imageContainer.addCallback(callback)
            case .downloaded:
                callback(imageContainer.image)
            }
            return
        }

        cachedImages[url] = CachedImage()
        cachedImages[url]?.addCallback(callback)

        let request = URLRequest(url: url)
        URLSession.shared.dataTask(with: request) { [weak self] (data, response, error) in
            guard let data = data else { return }
            DispatchQueue.main.async { [weak self] in
                let image = UIImage(data: data)
                self?.cachedImages[url]?.downloadedImage(image)
            }
        }.resume()
    }

    func removeCachedImage(from url: URL?) {
        guard let url = url else { return }
        cachedImages[url] = nil
    }

}
