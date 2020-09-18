//
//  CachedImage.swift
//  Happ
//
//  Created by Maksymilian Galas on 18/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import UIKit

final class CachedImage {
    enum Status {
        case downloading
        case downloaded
    }

    private(set) var image: UIImage?
    private(set) var status: Status = .downloading
    private var callbacks: [(UIImage?) -> Void] = []

    func addCallback(_ callback: @escaping (UIImage?) -> Void) {
        callbacks.append(callback)
    }

    func downloadedImage(_ image: UIImage?) {
        self.image = image
        status = .downloaded
        callbacks.forEach { callback in
            callback(image)
        }
        callbacks = []
    }
}
