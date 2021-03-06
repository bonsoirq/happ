//
//  HappeningDetailsViewModel.swift
//  Happ
//
//  Created by Maksymilian Galas on 18/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI

final class HappeningDetailsViewModel: ViewModel, ObservableObject {

    // MARK: Properties

    let imageRetriever: ImageRetrievable

    @Published private var happening: Happening

    var name: String { happening.name }
    var description: String { happening.description }
    var organizerDescription: String { happening.organizerDescription }
    var agenda: String { happening.agenda }

    var imageUrl: URL? { apiRequest.happeningImage(id: happening.id) }

    var shareDescription: String {
        let title = Translation.Happening.shareDescription.localized
        let url = "http://jbak.hopto.org:5000/discover/"
        let id = happening.id
        return "\(title)\n\(url)\(id)"
    }

    @Published var isPublished: Bool

    // MARK: Initialization

    init(apiRequest: APIRequestable, imageRetriever: ImageRetrievable, happening: Happening) {
        self.imageRetriever = imageRetriever
        self.happening = happening
        self.isPublished = happening.isPublished
        
        super.init(apiRequest: apiRequest)
    }

    // MARK: Methods

    func setPublished(_ isPublished: Bool, onError: @escaping (Error) -> Void) {
        guard happening.isPublished != isPublished else { return }
        let id = happening.id
        let data = HappeningData(
            name: happening.name,
            description: happening.description,
            organizerDescription: happening.organizerDescription,
            agenda: happening.agenda,
            isPublished: isPublished
        )

        apiRequest.happenings(.edit(id: id, data: data))
            .onError(onError)
            .onDataSuccess { [weak self] (happening: Happening?) in
                guard let happening = happening else { return }
                self?.happening = happening
                self?.isPublished = isPublished
            }
            .make()
    }

}
