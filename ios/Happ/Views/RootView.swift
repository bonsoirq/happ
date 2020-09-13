//
//  RootView.swift
//  Happ
//
//  Created by Maksymilian Galas on 12/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

struct RootView: View {

    // MARK: Views

    var body: some View {
        WelcomeView(viewModel: WelcomeViewModel())
    }
    
}

struct RootView_Previews: PreviewProvider {
    static var previews: some View {
        RootView()
    }
}
