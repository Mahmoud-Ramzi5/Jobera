class PaginationData {
  final int from;
  final int to;
  final int perPage;
  final int total;
  final int firstPage;
  final int currentPage;
  final int lastPage;
  final bool hasMorePages;
  final String firstPageUrl;
  final String currentPageUrl;
  final String lastPageUrl;
  final dynamic nextPage;
  final dynamic prevPage;
  final String path;

  PaginationData({
    required this.from,
    required this.to,
    required this.perPage,
    required this.total,
    required this.firstPage,
    required this.currentPage,
    required this.lastPage,
    required this.hasMorePages,
    required this.firstPageUrl,
    required this.currentPageUrl,
    required this.lastPageUrl,
    required this.nextPage,
    required this.prevPage,
    required this.path,
  });

  PaginationData.fromJson(Map<String, dynamic> json)
      : from = json['from'] as int,
        to = json['to'] as int,
        perPage = json['per_page'] as int,
        total = json['total'] as int,
        firstPage = json['first_page'] as int,
        currentPage = json['current_page'] as int,
        lastPage = json['last_page'] as int,
        hasMorePages = json['has_more_pages'] as bool,
        firstPageUrl = json['first_page_url'] as String,
        currentPageUrl = json['current_page_url'] as String,
        lastPageUrl = json['last_page_url'] as String,
        nextPage = json['next_page'],
        prevPage = json['prev_page'],
        path = json['path'] as String;
}
