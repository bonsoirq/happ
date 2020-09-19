//
//  CustomMenuItem.swift
//  Happ
//
//  Created by Maksymilian Galas on 17/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

enum ContextMenuItem {
    case copy
    case move
    case rename
    case edit
    case close
    case delete
    case share

    var text: String {
        let translation: Translation.ContextMenu
        switch self {
        case .copy:
            translation = .copy
        case .move:
            translation = .move
        case .rename:
            translation = .rename
        case .edit:
            translation = .edit
        case .close:
            translation = .close
        case .delete:
            translation = .delete
        case .share:
            translation = .share
        }
        return translation.localized
    }

    var image: Image {
        switch self {
        case .copy:
            return image(systemName: "doc.on.doc")
        case .move:
            return image(systemName: "folder")
        case .rename, .edit:
            return image(systemName: "pencil")
        case .close:
            return image(systemName: "xmark")
        case .delete:
            return image(systemName: "trash")
        case .share:
            return image(systemName: "square.and.arrow.up")
        }
    }

    private func image(systemName: String) -> Image {
        Image(uiImage:
            UIImage(systemName: systemName, withConfiguration:
                UIImage.SymbolConfiguration(scale: .default)
                )!
        )
    }
}
