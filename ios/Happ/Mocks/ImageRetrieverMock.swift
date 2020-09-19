//
//  ImageRetrieverMock.swift
//  Happ
//
//  Created by Maksymilian Galas on 18/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import UIKit

final class ImageRetrieverMock: ImageRetrievable {

    func downloadImage(from url: URL?, callback: @escaping (UIImage?) -> Void) {
        let image = UIImage(named: "ProfilePlaceholder")
        callback(image)
    }

    func removeCachedImage(from url: URL?) { }

}
