//
//  DefaultTextFieldStyle.swift
//  Happ
//
//  Created by Maksymilian Galas on 12/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

struct DefaultTextFieldStyle: ViewModifier {

    func body(content: Content) -> some View {
        content
            .padding()
            .frame(height: 50)
            .overlay(
                RoundedRectangle(cornerRadius: 10)
                    .stroke(Color.tertiary)
            )
    }
}

extension TextField {

    func defaultStyle() -> some View {
        modifier(DefaultTextFieldStyle())
    }

}

extension SecureField {

    func defaultStyle() -> some View {
        modifier(DefaultTextFieldStyle())
    }

}
