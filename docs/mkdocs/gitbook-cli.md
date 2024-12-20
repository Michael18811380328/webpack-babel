# gitbook-cli

统计信息：字数 1570  阅读4分钟


The GitBook command line interface.

Install this globally and you'll have access to the gitbook command anywhere on your system.

```bash
$ npm install -g gitbook-cli
```

**Note:** The purpose of the gitbook command is to load and run the version of GitBook you have specified in your book (or the latest one), irrespective of its version. The GitBook CLI only support versions `>=2.0.0` of GitBook.

`gitbook-cli` store GitBook's versions into `~/.gitbook`, you can set the `GITBOOK_DIR` environment variable to use another directory.

## How to use it?

### Run GitBook

Run command `gitbook build`, `gitbook serve` (read [GitBook documentation](https://github.com/GitbookIO/gitbook/blob/master/docs/setup.md) for details).

List all available commands using:

```
$ gitbook help
```

#### Specify a specific version

By default, GitBook CLI will read the gitbook version to use from the book configuration, but you can force a specific version using `--gitbook` option:

```
$ gitbook build ./mybook --gitbook=2.0.1
```

and list available commands in this version using:

```
$ gitbook help --gitbook=2.0.1
```

#### Manage versions

List installed versions:

```
$ gitbook ls
```

List available versions on NPM:

```
$ gitbook ls-remote
```

Install a specific version:

```
$ gitbook fetch 2.1.0
$ gitbook fetch beta
```

Update to the latest version

```
$ gitbook update
```

Uninstall a specific version

```
$ gitbook uninstall 2.0.1
```

Use a local folder as a GitBook version (for developement)

```
$ gitbook alias ./mygitbook latest
```
