//
//  DefaultButtonStyle.swift
//  Happ
//
//  Created by Maksymilian Galas on 12/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

struct DefaultButtonStyle: ViewModifier {

    var foregroundColor: Color
    var backgroundColor: Color

    func body(content: Content) -> some View {
        content
            .padding()
            .frame(height: 50)
            .background(backgroundColor)
            .cornerRadius(10)
            .foregroundColor(foregroundColor)
    }
}

extension Button {

    func defaultStyle(foregroundColor: Color, backgroundColor: Color) -> some View {
        modifier(DefaultButtonStyle(foregroundColor: foregroundColor, backgroundColor: backgroundColor))
    }

}
