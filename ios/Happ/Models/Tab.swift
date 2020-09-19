//
//  Tab.swift
//  Happ
//
//  Created by Maksymilian Galas on 16/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

enum Tab: Int, CaseIterable {
    case home
    case account

    var title: String {
        switch self {
        case .home:
            return Translation.Home.title.localized
        case .account:
            return Translation.Account.title.localized
        }
    }

    var image: some View {
        let image: Image
        switch self {
        case .home:
            image = Image(systemName:"house.fill")
        case .account:
            image = Image(systemName:"person.fill")
        }

        return image.renderingMode(.template).imageScale(.large)
    }
}
