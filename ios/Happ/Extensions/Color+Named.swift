//
//  Color+Named.swift
//  Happ
//
//  Created by Maksymilian Galas on 12/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

extension Color {

    static var main: Color {
        Color("Main")
    }

    static var secondaryMain: Color {
        Color("SecondaryMain")
    }

    static var secondaryText: Color {
        Color("SecondaryText")
    }

    static var tertiary: Color {
        Color(.tertiaryLabel)
    }

    static var background: Color {
        Color(.systemBackground)
    }

}
