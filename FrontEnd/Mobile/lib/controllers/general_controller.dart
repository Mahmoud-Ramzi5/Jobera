import 'package:dio/dio.dart';
import 'package:file_picker/file_picker.dart';
import 'package:get/get.dart' hide MultipartFile, FormData;
import 'package:image_picker/image_picker.dart';
import 'package:jobera/classes/dialogs.dart';
import 'package:jobera/models/countries.dart';
import 'package:jobera/models/skill_types.dart';
import 'package:jobera/models/skills.dart';
import 'package:jobera/models/states.dart';
import 'package:permission_handler/permission_handler.dart';

class GeneralController extends GetxController {
  late Dio dio;
  late ImagePicker picker;

  @override
  void onInit() {
    dio = Dio();
    picker = ImagePicker();
    super.onInit();
  }

  Future<void> requestPermissions() async {
    const cameraPermission = Permission.camera;
    const photoPermission = Permission.photos;
    const storagePermission = Permission.manageExternalStorage;
    if (await cameraPermission.isDenied) {
      await cameraPermission.request();
    }
    if (await photoPermission.isDenied) {
      await photoPermission.request();
    }
    if (await storagePermission.isDenied) {
      await storagePermission.request();
    }
  }

  Future<dynamic> getCountries() async {
    try {
      var response = await dio.get(
        'http://192.168.0.105:8000/api/countries',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
          },
        ),
      );
      if (response.statusCode == 200) {
        return Countries.fromJsonList(
          response.data['countries'],
        );
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.data['errors'].toString(),
      );
    }
  }

  Future<dynamic> getStates(String countryName) async {
    try {
      var response = await dio.post(
        'http://192.168.0.105:8000/api/states',
        data: {"country_name": countryName},
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
          },
        ),
      );
      if (response.statusCode == 200) {
        return States.fromJsonList(
          response.data['states'],
        );
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.data['errors'].toString(),
      );
    }
  }

  Future<dynamic> getSkillTypes() async {
    try {
      var response = await dio.get(
        'http://192.168.0.105:8000/api/skills/types',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
          },
        ),
      );
      if (response.statusCode == 200) {
        return SkillTypes.fromJsonList(response.data['types']);
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.data['errors'].toString(),
      );
    }
  }

  Future<dynamic> getSkills(String type) async {
    try {
      var response = await dio.get(
        'http://192.168.0.105:8000/api/skills?type[eq]=$type',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
          },
        ),
      );
      if (response.statusCode == 200) {
        return Skills.fromJsonList(response.data['skills']);
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.data['error'].toString(),
      );
    }
  }

  Future<dynamic> searchSkills(String name) async {
    try {
      var response = await dio.get(
        'http://192.168.0.105:8000/api/skills?name[like]=$name',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
          },
        ),
      );
      if (response.statusCode == 200) {
        return Skills.fromJsonList(response.data['skills']);
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.data['erros'].toString(),
      );
    }
  }

  Future<dynamic> downloadFile(String fileName) async {
    try {
      final response = await dio.get(
        'http://192.168.0.105:8000/api/file/$fileName',
        options: Options(
          responseType: ResponseType.bytes, // important
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/pdf; charset=UTF-8',
            'Accept': 'application/pdf',
            'Connection': 'Keep-Alive',
          },
        ),
      );
      if (response.statusCode == 200) {
        return response.data;
      }
    } on DioException catch (e) {
      Dialogs().showErrorDialog(
        'Error',
        e.response!.data['errors'].toString(),
      );
    }
  }

  Future<FilePickerResult?> pickFile() async {
    FilePickerResult? file = await FilePicker.platform.pickFiles(
      allowMultiple: false,
      allowedExtensions: ['pdf'],
      type: FileType.custom,
    );
    return file;
  }

  Future<XFile?> pickPhotoFromGallery() async {
    const permission = Permission.photos;
    if (await permission.isDenied) {
      final result = await permission.request();
      if (result.isPermanentlyDenied) {
        // Permission is granted
        openAppSettings();
      }
    } else if (await permission.isGranted) {
      // Permission is granted
      XFile? image;
      image = await picker.pickImage(
        source: ImageSource.gallery,
      );
      return image;
    }
    return null;
  }

  Future<XFile?> takePhotoFromCamera() async {
    const permission = Permission.camera;
    if (await permission.isDenied) {
      final result = await permission.request();
      if (result.isPermanentlyDenied) {
        // Permission is granted
        openAppSettings();
      }
    } else if (await permission.isGranted) {
      // Permission is granted
      XFile? image;
      image = await picker.pickImage(
        source: ImageSource.camera,
      );
      return image;
    }
    return null;
  }
}
