package cwui.backend.app;

import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.nio.file.FileStore;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Paths;
import java.util.ArrayList;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import cwui.backend.models.FileMetadata;
import cwui.backend.models.FileTypes;

@Path("files")
public class FileBrowser {
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public FileMetadata[] getFiles(@QueryParam("parent") String parentDirectory) throws IOException {

		final Boolean isRoot = parentDirectory.equals(null) || parentDirectory.equals("");

		if (isRoot) {
			parentDirectory = System.getProperty("user.home");
		}

		if (parentDirectory != null) {
			java.nio.file.Path parentPath = Paths.get(parentDirectory);
			if (java.nio.file.Files.exists(parentPath, LinkOption.NOFOLLOW_LINKS)) {
				File parentFolder = new File(parentDirectory);
				File[] listOfFiles = parentFolder.listFiles(new FileFilter() {
					@Override
					public boolean accept(File file) {
						if (isRoot && file.getName().startsWith(".")) {
							return false;
						}
						return !file.isHidden();
					}
				});
				if (listOfFiles == null)
					listOfFiles = new File[0];
				FileMetadata[] rootMeta = new FileMetadata[0];
				if (isRoot) {
					ArrayList<FileMetadata> roots = new ArrayList<FileMetadata>();
					for (java.nio.file.Path root : FileSystems.getDefault().getRootDirectories()) {
						FileStore fileStore = Files.getFileStore(root);
						FileMetadata rootMetadata = new FileMetadata();
						rootMetadata.setFileType(FileTypes.Drive);
						rootMetadata.setFullPath(root.toString());
						rootMetadata.setName(fileStore.toString());
						roots.add(rootMetadata);
					}
					rootMeta = roots.toArray(new FileMetadata[roots.size()]);
				}
				ArrayList<FileMetadata> directories = new ArrayList<FileMetadata>();
				ArrayList<FileMetadata> files = new ArrayList<FileMetadata>();
				for (int i = 0; i < listOfFiles.length; i++) {
					File currentFile = listOfFiles[i];
					FileMetadata metadata = new FileMetadata();
					metadata.setName(currentFile.getName());
					metadata.setFileType(currentFile.isDirectory() ? FileTypes.Directory : FileTypes.File);
					metadata.setFullPath(currentFile.getAbsolutePath());

					if (currentFile.isDirectory()) {
						directories.add(metadata);
					} else {
						files.add(metadata);
					}
				}
				FileMetadata[] combined = new FileMetadata[directories.size() + files.size() + rootMeta.length];
				System.arraycopy(files.toArray(new FileMetadata[files.size()]), 0, combined, 0, files.size());
				System.arraycopy(directories.toArray(new FileMetadata[directories.size()]), 0, combined, files.size(),
						directories.size());
				System.arraycopy(rootMeta, 0, combined, files.size() + directories.size(), rootMeta.length);
				return combined;
			}
		}

		return null;
	}
}
