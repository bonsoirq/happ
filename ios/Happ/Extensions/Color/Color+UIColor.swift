//
//  Color+UIColor.swift
//  Happ
//
//  Created by Maksymilian Galas on 12/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import UIKit
import SwiftUI

extension UIColor {

    var rgba: (red: Double, green: Double, blue: Double, alpha: Double) {
        var red: CGFloat = 0
        var green: CGFloat = 0
        var blue: CGFloat = 0
        var alpha: CGFloat = 0
        getRed(&red, green: &green, blue: &blue, alpha: &alpha)

        return (Double(red), Double(green), Double(blue), Double(alpha))
    }

}

extension Color {

    init(uiColor: UIColor) {
        let rgba = uiColor.rgba
        self.init(red: rgba.red, green: rgba.green, blue: rgba.blue, opacity: rgba.alpha)
    }

    static var tertiary: Color {
        Color(uiColor: .tertiaryLabel)
    }

    static var background: Color {
        Color(uiColor: .systemBackground)
    }

}
