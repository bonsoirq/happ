//
//  HappeningRow.swift
//  Happ
//
//  Created by Maksymilian Galas on 17/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

struct HappeningRow: View {

    // MARK: Properties

    let happening: Happening
    var onEdit: (Happening) -> Void = { _ in }
    var onDelete: (Happening) -> Void = { _ in }

    // MARK: Views

    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            Text(happening.name)
                .font(.headline)
                .lineLimit(3)

            Text(happening.description)
                .lineLimit(4)
                .font(.body)
                .foregroundColor(.secondary)
        }
        .padding()
        .foregroundColor(.primary)
        .contextMenu {
//            ContextMenuButton(.edit, action: onHappeningEdit)
            ContextMenuButton(.delete, action: onHappeningDelete)
        }
    }

    // MARK: Methods

    private func onHappeningEdit() {
        onEdit(happening)
    }

    private func onHappeningDelete() {
        onDelete(happening)
    }
}

struct HappeningRow_Previews: PreviewProvider {
    static var previews: some View {
        HappeningRow(happening: MockData.happening)
    }
}
