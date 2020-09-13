//
//  View+Error.swift
//  Happ
//
//  Created by Maksymilian Galas on 13/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

extension View {
    
    func error(_ error: Binding<IdentifableError?>, onDismiss: ((IdentifableError) -> Void)? = nil) -> some View {
        alert(item: error) { (error) in
            Alert(
                title: Text(Translation.Error.title.localized),
                message: Text(error.localized),
                dismissButton: .default(
                    Text(Translation.Alert.confirm.localized),
                    action: { onDismiss?(error) }
                )
            )
        }
    }
    
}
